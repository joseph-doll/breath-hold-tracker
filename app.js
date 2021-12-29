const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const BreathHold = require('./models/breathHold');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

mongoose.connect('mongodb://127.0.0.1:27017/breath-hold-tracker', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});


const app = express();

app.engine('ejs', ejsMate); //use ejs-locals for all ejs templates


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/breathholds', async(req, res) => {
    const breathholds = await BreathHold.find({});
    res.render('breathholds/index', { breathholds });
});

app.get('/breathholds/new', (req, res) => {
    res.render('breathholds/new');
});

app.post('/breathholds', catchAsync(async (req, res, next) => {
    const breathhold = new BreathHold(req.body.breathhold);
    await breathhold.save();
    res.redirect(`breathholds/${breathhold._id}`);
}));

app.get('/breathholds/:id', catchAsync(async (req, res) => {
    const breathhold = await BreathHold.findById(req.params.id);
    res.render('breathholds/show', { breathhold });
}));

app.get('/breathholds/:id/edit', catchAsync(async (req, res) => {
    const breathhold = await BreathHold.findById(req.params.id);
    res.render('breathholds/edit', { breathhold });
}));

app.put('/breathholds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const breathhold = await BreathHold.findByIdAndUpdate(id, {
        ...req.body.breathhold,
    });
    await breathhold.save();
    res.redirect(`/breathholds/${breathhold._id}`);
}));

app.delete('/breathholds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await BreathHold.findByIdAndDelete(id);
    res.redirect('/breathholds');
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    if (!err.message) err.message = 'Oh no, something went wrong';
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on localhost:3000');
});