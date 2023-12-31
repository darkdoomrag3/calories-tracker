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

    addWorkOut(_WorkOut) {
        this._WorkOut.push(_WorkOut);
        this._totalCalories -= _WorkOut.calories;
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
        const percentage = (this._totalCalories / this._caloriesLimit) * 100;
        const width = Math.min(percentage, 100);
        progressEl.style.width = `${width}%`;
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
        const caloriesProgress = document.getElementById('calorie-progress');
        caloriesRemainingEl.innerHTML = remaining;
        if (remaining <= 0) {
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
            caloriesProgress.classList.remove('bg-success');
            caloriesProgress.classList.add('bg-danger');
        }

        else {
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

class App {
    constructor() {
        this._tracker = new CaloriesTracker();
        document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this));
        document.getElementById('workout-form').addEventListener('submit', this._newWorkOut.bind(this));
    }

    _newMeal(e) {
        e.preventDefault();
        const name = document.getElementById('meal-name')
        const calories = document.getElementById('meal-calories')
        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
            return;
        }
        const meal = new Meal(name.value, +calories.value);
        this._tracker.addMeal(meal);
        name.value = '';
        calories.value = '';
        const collapseMeal= document.getElementById('collapse-meal');
        const collapseBs= new bootstrap.Collapse(collapseMeal,{
            toggle: true
        })
    }

    _newWorkOut(e) {
        e.preventDefault();
        const name = document.getElementById('workout-name')
        const calories = document.getElementById('workout-calories')
        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
            return;
        }
        const workOut = new WorkOut(name.value, +calories.value);
        this._tracker.addWorkOut(workOut);
        name.value = '';
        calories.value = '';
        const collapseWorkout= document.getElementById('collapse-workout');
        const collapseWorkoutBs= new bootstrap.Collapse(collapseWorkout,{
            toggle: true
        })
    }
}

const app = new App();