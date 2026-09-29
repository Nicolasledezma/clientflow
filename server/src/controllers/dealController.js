const prisma = require("../lib/prisma");

const getDeals = async (req, res) => {
  try {
    const deals = await prisma.deal.findMany({
      where: {
        userId: req.user.userId,
      },
      include: {
        client: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      status: "success",
      data: deals,
    });
  } catch (error) {
    console.error("Error fetching deals:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch deals",
    });
  }
};

const getDealById = async (req, res) => {
  try {
    const dealId = Number(req.params.id);

    if (Number.isNaN(dealId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid deal ID",
      });
    }

    const deal = await prisma.deal.findFirst({
      where: {
        id: dealId,
        userId: req.user.userId,
      },
      include: {
        client: true,
      },
    });

    if (!deal) {
      return res.status(404).json({
        status: "error",
        message: "Deal not found",
      });
    }

    res.json({
      status: "success",
      data: deal,
    });
  } catch (error) {
    console.error("Error fetching deal:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch deal",
    });
  }
};

const createDeal = async (req, res) => {
  try {
    const {
      title,
      description,
      value,
      stage,
      probability,
      expectedCloseDate,
      clientId,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        status: "error",
        message: "Deal title is required",
      });
    }

    if (clientId !== undefined && clientId !== null) {
      const client = await prisma.client.findFirst({
        where: {
          id: Number(clientId),
          userId: req.user.userId,
        },
      });

      if (!client) {
        return res.status(404).json({
          status: "error",
          message: "Client not found",
        });
      }
    }

    const deal = await prisma.deal.create({
      data: {
        title,
        description,
        value: Number(value) || 0,
        stage: stage || "lead",
        probability: Number(probability) || 0,
        expectedCloseDate: expectedCloseDate
          ? new Date(expectedCloseDate)
          : null,
        clientId:
          clientId !== undefined && clientId !== null
            ? Number(clientId)
            : null,
        userId: req.user.userId,
      },
      include: {
        client: true,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Deal created successfully",
      data: deal,
    });
  } catch (error) {
    console.error("Error creating deal:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to create deal",
    });
  }
};

const updateDeal = async (req, res) => {
  try {
    const dealId = Number(req.params.id);

    if (Number.isNaN(dealId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid deal ID",
      });
    }

    const existingDeal = await prisma.deal.findFirst({
      where: {
        id: dealId,
        userId: req.user.userId,
      },
    });

    if (!existingDeal) {
      return res.status(404).json({
        status: "error",
        message: "Deal not found",
      });
    }

    const {
      title,
      description,
      value,
      stage,
      probability,
      expectedCloseDate,
      clientId,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        status: "error",
        message: "Deal title is required",
      });
    }

    if (clientId !== undefined && clientId !== null) {
      const client = await prisma.client.findFirst({
        where: {
          id: Number(clientId),
          userId: req.user.userId,
        },
      });

      if (!client) {
        return res.status(404).json({
          status: "error",
          message: "Client not found",
        });
      }
    }

    const deal = await prisma.deal.update({
      where: {
        id: dealId,
      },
      data: {
        title,
        description,
        value: Number(value) || 0,
        stage: stage || "lead",
        probability: Number(probability) || 0,
        expectedCloseDate: expectedCloseDate
          ? new Date(expectedCloseDate)
          : null,
        clientId:
          clientId !== undefined && clientId !== null
            ? Number(clientId)
            : null,
      },
      include: {
        client: true,
      },
    });

    res.json({
      status: "success",
      message: "Deal updated successfully",
      data: deal,
    });
  } catch (error) {
    console.error("Error updating deal:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to update deal",
    });
  }
};

const deleteDeal = async (req, res) => {
  try {
    const dealId = Number(req.params.id);

    if (Number.isNaN(dealId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid deal ID",
      });
    }

    const existingDeal = await prisma.deal.findFirst({
      where: {
        id: dealId,
        userId: req.user.userId,
      },
    });

    if (!existingDeal) {
      return res.status(404).json({
        status: "error",
        message: "Deal not found",
      });
    }

    await prisma.deal.delete({
      where: {
        id: dealId,
      },
    });

    res.json({
      status: "success",
      message: "Deal deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting deal:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to delete deal",
    });
  }
};

module.exports = {
  getDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
};