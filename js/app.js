class CaloriesTracker {
    constructor() {
        this._caloriesLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._WorkOut = [];
        this._displayCalloriesTotal();
        this._displayTotalLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._CaloriesRemaining();
        this._displayCaloriesProgress();
    }
    //public methods API
    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._render();

    }

    addWorkOut(WorkOut) {
        this._WorkOut.push(WorkOut);
        this._totalCalories -= WorkOut.calories;
        this._render();
    }

    //Private method API
    _displayCalloriesTotal() {
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;
    }
    _render() {
        this._displayCalloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._CaloriesRemaining();
        this._displayCaloriesProgress();
    }

    _displayTotalLimit() {
        const totalLimitEl = document.getElementById('calories-limit');
        totalLimitEl.innerHTML = this._caloriesLimit;
    }

    _displayCaloriesProgress() {
        const progressEl = document.getElementById('calorie-progress');
        const progress = (this._totalCalories / this._caloriesLimit) * 100;
        const width = `${progress}%`;
        progressEl.style.width = width;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
        caloriesConsumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const Burend = this._WorkOut.reduce((total, workOut) => total + workOut.calories, 0);
        caloriesBurnedEl.innerHTML = Burend;
    }
    _CaloriesRemaining() {
        const caloriesRemainingEl = document.getElementById('calories-remaining');
        const remaining = this._caloriesLimit - this._totalCalories;
        caloriesRemainingEl.innerHTML = remaining;
        if(remaining <= 0) {
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
        }
        else{
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
        }
    
    }

}

class Meal {
    constructor(name, calories) {
        this.name = name;
        this.calories = calories;
        this.id = Math.random().toString(16).slice(2);

    }
}


class WorkOut {
    constructor(name, calories) {
        this.name = name;
        this.calories = calories;
        this.id = Math.random().toString(16).slice(2);

    }
}

const tracker = new CaloriesTracker();

const brakefast = new Meal('Brakefast', 300);
const lunch = new Meal('Lunch', 600);
tracker.addMeal(brakefast);
tracker.addMeal(lunch);
const run = new WorkOut('Run', 300);
tracker.addWorkOut(run);

console.log(tracker._meals)
console.log(tracker._WorkOut)
console.log(tracker._totalCalories)