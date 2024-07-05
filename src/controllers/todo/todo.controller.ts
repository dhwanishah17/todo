// controllers/userController.ts

import { Request, Response } from 'express';
import db from '../../models';
import { sendEmail } from '../../services/email.service';


const todoModel = db['ToDo'];
const scheduleReminder = async (email:string,todoId: number, reminderTime: Date): Promise<void> => {
  const now = new Date();
  console.log("trdfyguijjbvhgfty",email,todoId);
  
  await sendEmail(email, 'New Task', `New Todo added`);

  const timeDiff = reminderTime?.getTime() - now.getTime();

  setTimeout(async () => {
    try {
      const todo = await todoModel.findByPk(todoId);

      if (todo) {
        await sendReminderEmail(email, todo.title);
      }
    } catch (error) {
      console.error('Error scheduling reminder:', error);
    }
  }, timeDiff);
};

const sendReminderEmail = async (email:any, todoTitle: string): Promise<void> => {
  try {
    await sendEmail(email, 'Reminder: todoModel Task', `Reminder: Don't forget to complete task "${todoTitle}"`);
  } catch (error) {
    console.error('Error sending reminder email:', error);
  }
};
export  class TodoController {
 async createTodo  (req: any, res: Response): Promise<void> {
  try {
    const { title, description, dueDate ,reminderTime } = req.body;
    const userId = req.user.id; 

    const newTodo = await todoModel.create({
      title,
      description,
      dueDate: new Date(dueDate),
      reminderTime: reminderTime ? new Date(reminderTime) : null, 
      userId,
    });    
    if (reminderTime) {
      scheduleReminder(req.user.email,newTodo.id, new Date(reminderTime));
    }
    res.status(201).json({ todo: newTodo });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

async getTodoLists (req: any, res: Response): Promise<void> {
  try {
    const userId = req.user.id; 

    const todos = await todoModel.findAll({ where: { userId } });

    res.status(200).json({ todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

async deleteTodo (req: any, res: Response): Promise<void>{
  try {
    const todoId = Number(req.params.id);
    const userId = req.user.id;

    const todo = await todoModel.findOne({ where: { id: todoId, userId } });

    if (!todo) {
      res.status(404).json({ error: 'todoModel not found' });
      return;
    }

    await todo.destroy();

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

async updateTodo (req: any, res: Response): Promise<void> {
  try {
    const todoId = Number(req.params.id);
    const { title, description, dueDate } = req.body;
    const userId = req.user.id;

    let todo = await todoModel.findOne({ where: { id: todoId, userId } });

    if (!todo) {
      res.status(404).json({ error: 'todoModel not found' });
      return;
    }

    todo = await todo.update({ title, description, dueDate });

    res.status(200).json({ todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

async markTodoComplete (req: any, res: Response): Promise<void>{
  try{ 
     const todoId = Number(req.params.id);
    const userId = req.user.id; 

    let todo = await todoModel.findOne({ where: { id: todoId, userId } });

    if (!todo) {
      res.status(404).json({ error: 'todoModel not found' });
      return;
    }

    todo = await todo.update({ completed: true });

    res.status(200).json({ todo });
  }
  catch (error) {
    console.error('Error marking todo as complete:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

  async unmarkTodoComplete (req: any, res: Response): Promise<void> {
    try {
      const todoId = Number(req.params.id);
      const userId = req.user.id;
  
      let todo = await todoModel.findOne({ where: { id: todoId, userId } });
  
      if (!todo) {
        res.status(404).json({ error: 'todoModel not found' });
        return;
      }
  
      todo = await todo.update({ completed: false });
  
      res.status(200).json({ todo });
    } catch (error) {
      console.error('Error marking todo as incomplete:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
};



