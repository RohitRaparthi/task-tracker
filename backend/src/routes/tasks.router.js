const express = require('express');
const router = express.Router();
const taskService = require('../services/task.service');
const insightService = require('../services/insight.service');

// POST /tasks
router.post('/', async (req, res) => {
  const errors = taskService.validateCreate(req.body);
  if (errors.length) return res.status(400).json({ ok: false, errors });

  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ ok: true, task });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.query);
    res.json({ ok: true, tasks });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// PATCH /tasks/:id
router.patch('/:id', async (req, res) => {
  const errors = taskService.validateUpdate(req.body);
  if (errors.length) return res.status(400).json({ ok: false, errors });

  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, task: updated });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /insights
router.get('/insights', async (req, res) => {
  try {
    const insights = await insightService.getInsights();
    res.json({ ok: true, insights });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
