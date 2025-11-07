const Experience = require('../models/Experience');

// Get all experiences with search
exports.getAllExperiences = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const experiences = await Experience.find(query);
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences', error: error.message });
  }
};

// Get single experience
exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience', error: error.message });
  }
};

// Create new experience
exports.createExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ message: 'Error creating experience', error: error.message });
  }
};