const prisma = require("../config/db");

/*
=================================
Create Project
=================================
*/

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    /*
    ============================
    Validation
    ============================
    */

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    /*
    ============================
    Create Project
    ============================
    */

    const project = await prisma.project.create({
      data: {
        title,
        description,

        adminId: req.user.id,

        members: {
          create: {
            userId: req.user.id,
          },
        },
      },

      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        members: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    /*
    ============================
    Find User Projects
    ============================
    */

    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: req.user.id,
          },
        },
      },

      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },

        tasks: true,
      },
    });

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;

    /*
    ============================
    Find Project
    ============================
    */

    const project = await prisma.project.findFirst({
      where: {
        id,

        members: {
          some: {
            userId: req.user.id,
          },
        },
      },

      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },

        tasks: true,
      },
    });

    /*
    ============================
    Project Not Found
    ============================
    */

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { email } = req.body;

    /*
    ============================
    Validate Email
    ============================
    */

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Member email is required",
      });
    }

    /*
    ============================
    Find Project
    ============================
    */

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    /*
    ============================
    Admin Check
    ============================
    */

    if (project.adminId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only admin can add members",
      });
    }

    /*
    ============================
    Find User
    ============================
    */

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /*
    ============================
    Already Member Check
    ============================
    */

    const existingMember =
      await prisma.projectMember.findFirst({
        where: {
          projectId: id,
          userId: user.id,
        },
      });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "User already a member",
      });
    }

    /*
    ============================
    Add Member
    ============================
    */

    await prisma.projectMember.create({
      data: {
        projectId: id,
        userId: user.id,
      },
    });

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,
      message: "Member added successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeMember = async (req, res) => {
  try {
    const { id, memberId } = req.params;

    /*
    ============================
    Find Project
    ============================
    */

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    /*
    ============================
    Admin Check
    ============================
    */

    if (project.adminId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only admin can remove members",
      });
    }

    /*
    ============================
    Remove Member
    ============================
    */

    await prisma.projectMember.deleteMany({
      where: {
        projectId: id,
        userId: memberId,
      },
    });

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getSingleProject,
  addMember,
  removeMember,
};
