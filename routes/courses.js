const express = require('express');
const router = express.Router();

// Dummy course coz no DB
const courses = [
    {id: 1, name: 'course1' },
    {id: 2, name: 'course2' },
    {id: 3, name: 'course3' },
];

// GET courses Route

router.get('/', (req, res) => {
    res.send(courses);
});

// Get course route

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with the given ID was not find");
    res.send(course);
});

// POST course route

router.post('/', (req, res) => {
    const result = validateCourse(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };

    courses.push(course);
    res.send(course);
});

// PUT course route

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not find");

    const result = validateCourse(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

// DELETE course route

router.delete('/:id', (req, res) => {
const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) return res.status(404).send('The course with the given ID was not find');

const index = courses.indexOf(course);
courses.splice(index, 1);
res.send(course);
});

// Validate with Joi
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    });

    return schema.validate(course);
};

module.exports = router;