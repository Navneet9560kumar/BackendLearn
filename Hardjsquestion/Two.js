class TaskScheduler {
  constructor(concurrency) {
    this.concurrency = Number(concurrency);
    this.runningTasks = 0;
    this._waitingQueue = [];
  }

  getNextTask() {
    if (this.runningTasks < this.concurrency && this._waitingQueue.length > 0) {
      const nextTask = this._waitingQueue.shift();
      nextTask();
    }
  }

  addTask(task) {
    return new Promise((resolve, reject) => {

      const __taskRunner = async () => {
        this.runningTasks += 1;

        try {
          const result = await task();
          console.log("Result:", result);
          resolve(result);
        } catch (error) {
          console.log("Task Failed:", error);
          reject(error);
        } finally {
          this.runningTasks -= 1;
          this.getNextTask();
        }
      };

      if (this.runningTasks < this.concurrency) {
        __taskRunner();
      } else {
        this._waitingQueue.push(__taskRunner);
      }
    });
  }
}


const scheduler = new TaskScheduler(2);

const createTask = (time, id) => () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(`Task ${id} done`);
    }, time);
  });

scheduler.addTask(createTask(2000, 1));
scheduler.addTask(createTask(1000, 2));
scheduler.addTask(createTask(3000, 3));
scheduler.addTask(createTask(1000, 4));
