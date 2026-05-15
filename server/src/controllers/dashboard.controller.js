const prisma = require("../config/db");

/*
=================================
Get Dashboard Analytics
=================================
*/

const getDashboardData = async (req, res) => {
  try {
    /*
    ============================
    Get User Projects
    ============================
    */

    const memberships =
      await prisma.projectMember.findMany({
        where: {
          userId: req.user.id,
        },

        select: {
          projectId: true,
        },
      });

    const projectIds = memberships.map(
      (member) => member.projectId
    );

    /*
    ============================
    Total Tasks
    ============================
    */

    const totalTasks = await prisma.task.count({
      where: {
        projectId: {
          in: projectIds,
        },
      },
    });

    /*
    ============================
    Tasks By Status
    ============================
    */

    const todoTasks = await prisma.task.count({
      where: {
        projectId: {
          in: projectIds,
        },

        status: "TODO",
      },
    });

    const inProgressTasks =
      await prisma.task.count({
        where: {
          projectId: {
            in: projectIds,
          },

          status: "IN_PROGRESS",
        },
      });

    const completedTasks =
      await prisma.task.count({
        where: {
          projectId: {
            in: projectIds,
          },

          status: "DONE",
        },
      });

    /*
    ============================
    Overdue Tasks
    ============================
    */

    const overdueTasks = await prisma.task.count({
      where: {
        projectId: {
          in: projectIds,
        },

        dueDate: {
          lt: new Date(),
        },

        status: {
          not: "DONE",
        },
      },
    });

    /*
    ============================
    Tasks Per User
    ============================
    */

    const tasksPerUser =
      await prisma.task.groupBy({
        by: ["assignedToId"],

        where: {
          projectId: {
            in: projectIds,
          },
        },

        _count: {
          assignedToId: true,
        },
      });

    /*
    ============================
    Response
    ============================
    */

    return res.status(200).json({
      success: true,

      analytics: {
        totalTasks,

        tasksByStatus: {
          todo: todoTasks,
          inProgress: inProgressTasks,
          completed: completedTasks,
        },

        overdueTasks,

        tasksPerUser,
      },
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
  getDashboardData,
};