const { CaloriesTracker, Meal, WorkOut } = require('../app.js');

describe('CaloriesTracker', () => {
  let tracker;

  beforeEach(() => {
    tracker = new CaloriesTracker();
  });

  test('adding a meal updates total calories', () => {
    const meal = new Meal('Test Meal', 500);
    tracker.addMeal(meal);
    expect(tracker._totalCalories).toBe(500);
  });

  test('adding a workout updates total calories', () => {
    const workout = new WorkOut('Test Workout', 200);
    tracker.addWorkOut(workout);
    expect(tracker._totalCalories).toBe(-200);
  });

 
});

test('adding multiple meals updates total calories', () => {
    const mockDisplayCalloriesTotal = jest.fn();
    const tracker = new CaloriesTracker(mockDisplayCalloriesTotal);

    const meal1 = new Meal('Meal 1', 500);
    const meal2 = new Meal('Meal 2', 300);
    tracker.addMeal(meal1);
    tracker.addMeal(meal2);

    expect(mockDisplayCalloriesTotal).toHaveBeenNthCalledWith(1, 500);
    expect(mockDisplayCalloriesTotal).toHaveBeenNthCalledWith(2, 800); // Total after adding both meals
});

test('adding a workout updates total burned calories', () => {
    const mockDisplayCaloriesBurned = jest.fn();
    const tracker = new CaloriesTracker(undefined, mockDisplayCaloriesBurned);

    const workout = new WorkOut('Test Workout', 200);
    tracker.addWorkOut(workout);

    expect(mockDisplayCaloriesBurned).toHaveBeenCalledWith(200);
});

test('adding multiple workouts updates total burned calories', () => {
    const mockDisplayCaloriesBurned = jest.fn();
    const tracker = new CaloriesTracker(undefined, mockDisplayCaloriesBurned);

    const workout1 = new WorkOut('Workout 1', 300);
    const workout2 = new WorkOut('Workout 2', 150);
    tracker.addWorkOut(workout1);
    tracker.addWorkOut(workout2);

    expect(mockDisplayCaloriesBurned).toHaveBeenNthCalledWith(1, 300);
    expect(mockDisplayCaloriesBurned).toHaveBeenNthCalledWith(2, 450); // Total after adding both workouts
});

// Add more tests to cover other scenarios and edge cases...


