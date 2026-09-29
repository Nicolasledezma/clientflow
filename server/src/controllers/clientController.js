const prisma = require("../lib/prisma");

const getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      status: "success",
      data: clients,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch clients",
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const clientId = Number(req.params.id);

    if (Number.isNaN(clientId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid client ID",
      });
    }

    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: req.user.userId,
      },
    });

    if (!client) {
      return res.status(404).json({
        status: "error",
        message: "Client not found",
      });
    }

    res.json({
      status: "success",
      data: client,
    });
  } catch (error) {
    console.error("Error fetching client:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch client",
    });
  }
};

const createClient = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      position,
      status,
      notes,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Client name is required",
      });
    }

    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        company,
        position,
        status: status || "active",
        notes,
        userId: req.user.userId,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Client created successfully",
      data: client,
    });
  } catch (error) {
    console.error("Error creating client:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to create client",
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const clientId = Number(req.params.id);

    if (Number.isNaN(clientId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid client ID",
      });
    }

    const existingClient = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: req.user.userId,
      },
    });

    if (!existingClient) {
      return res.status(404).json({
        status: "error",
        message: "Client not found",
      });
    }

    const {
      name,
      email,
      phone,
      company,
      position,
      status,
      notes,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Client name is required",
      });
    }

    const client = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        name,
        email,
        phone,
        company,
        position,
        status,
        notes,
      },
    });

    res.json({
      status: "success",
      message: "Client updated successfully",
      data: client,
    });
  } catch (error) {
    console.error("Error updating client:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to update client",
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const clientId = Number(req.params.id);

    if (Number.isNaN(clientId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid client ID",
      });
    }

    const existingClient = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: req.user.userId,
      },
    });

    if (!existingClient) {
      return res.status(404).json({
        status: "error",
        message: "Client not found",
      });
    }

    await prisma.client.delete({
      where: {
        id: clientId,
      },
    });

    res.json({
      status: "success",
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to delete client",
    });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};