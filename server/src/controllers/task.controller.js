const prisma = require("../config/db");

/*
=================================
Create Task
=================================
*/

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedToId,
      projectId,
    } = req.body;

    /*
    ============================
    Validation
    ============================
    */

    if (!title || !assignedToId || !projectId) {
      return res.status(400).json({
        success: false,
        message:
          "Title, assigned user, and project are required",
      });
    }

    /*
    ============================
    Find Project
    ============================
    */

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
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
        message: "Only admin can create tasks",
      });
    }

    /*
    ============================
    Check Assigned User Membership
    ============================
    */

    const member = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: assignedToId,
      },
    });

    if (!member) {
      return res.status(400).json({
        success: false,
        message: "User is not a project member",
      });
    }

    /*
    ============================
    Create Task
    ============================
    */

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate
          ? new Date(dueDate)
          : null,

        assignedToId,
        projectId,
      },

      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    /*
    ============================
    Response
    ============================
    */

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    /*
    ============================
    Check Membership
    ============================
    */

    const member = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: req.user.id,
      },
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    /*
    ============================
    Get Tasks
    ============================
    */

    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },

      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;

    const { status } = req.body;

    /*
    ============================
    Find Task
    ============================
    */

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    /*
    ============================
    Ownership Check
    ============================
    */

    if (task.assignedToId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message:
          "You can update only your assigned tasks",
      });
    }

    /*
    ============================
    Update Status
    ============================
    */

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        status,
      },
    });

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,
      message: "Task status updated",
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const {
      title,
      description,
      priority,
      dueDate,
      assignedToId,
    } = req.body;

    /*
    ============================
    Find Task
    ============================
    */

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },

      include: {
        project: true,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    /*
    ============================
    Admin Check
    ============================
    */

    if (task.project.adminId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only admin can update tasks",
      });
    }

    /*
    ============================
    Update Task
    ============================
    */

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        title,
        description,
        priority,
        assignedToId,

        dueDate: dueDate
          ? new Date(dueDate)
          : undefined,
      },
    });

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    /*
    ============================
    Find Task
    ============================
    */

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },

      include: {
        project: true,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    /*
    ============================
    Admin Check
    ============================
    */

    if (task.project.adminId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete tasks",
      });
    }

    /*
    ============================
    Delete Task
    ============================
    */

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const filterTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    /*
    ============================
    Check Membership
    ============================
    */

    const member = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: req.user.id,
      },
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    /*
    ============================
    Build Filters
    ============================
    */

    const filters = {
      projectId,
    };

    if (status) {
      filters.status = status;
    }

    if (priority) {
      filters.priority = priority;
    }

    if (search) {
      filters.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    /*
    ============================
    Get Tasks
    ============================
    */

    const tasks = await prisma.task.findMany({
      where: filters,

      skip: (page - 1) * limit,

      take: Number(limit),

      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    /*
    ============================
    Total Count
    ============================
    */

    const totalTasks = await prisma.task.count({
      where: filters,
    });

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,

      page: Number(page),

      totalPages: Math.ceil(
        totalTasks / limit
      ),

      totalTasks,

      tasks,
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
  createTask,
  getProjectTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
  filterTasks,
};