const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.send('<a href="calculator.html">Go to Calculator</a>'));

app.post('/calculate', (req, res) => {

    let weight = Number(req.body.weight);
    let type = req.body.mailType;
    let cost = calculateRates(type, weight);
    
    res.render('showValue', {
        cost: cost,
        weight: weight,
        type: type
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


function calculateRates(type, weight) {
    let cost = undefined;
    if (type === 'stamped' && weight > 0) {
        if (weight <= 1) {
            cost = 0.55;
        } else if (weight <= 2) {
            cost = 0.7;
        } else if (weight <= 3) {
            cost = 0.85;
        } else if (weight <= 3.5) {
            cost = 1.0
        }
    }
    if (type === 'metered' && weight > 0) {
        if (weight <= 1) {
            cost = 0.50;
        } else if (weight <= 2) {
            cost = 0.65;
        } else if (weight <= 3) {
            cost = 0.80;
        } else if (weight <= 3.5) {
            cost = .95
        }
    }
    if (type === 'flats' && weight > 0) {
        if (weight <= 1) {
            cost = 1.0;
        } else if (weight <= 2) {
            cost = 1.15;
        } else if (weight <= 3) {
            cost = 1.30;
        } else if (weight <= 4) {
            cost = 1.45
        } else if (weight <= 5) {
            cost = 1.60
        } else if (weight <= 6) {
            cost = 1.75
        } else if (weight <= 7) {
            cost = 1.90
        } else if (weight <= 8) {
            cost = 2.05
        } else if (weight <= 9) {
            cost = 2.2
        } else if (weight <= 10) {
            cost = 2.35
        } else if (weight <= 11) {
            cost = 2.5
        } else if (weight <= 12) {
            cost = 2.65
        } else if (weight <= 13) {
            cost = 2.80
        }
    }
    if (type === 'retail' && weight > 0) {
        if (weight <= 4) {
            cost = 3.66;
        } else if (weight <= 8) {
            cost = 4.39;
        } else if (weight <= 12) {
            cost = 5.19;
        } else if (weight <= 13) {
            cost = 5.71
        }
    }
    return cost;
}