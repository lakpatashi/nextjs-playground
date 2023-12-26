// app/page.tsx
import { createClient } from '@supabase/supabase-js';

export default function TodoList() {

  const addTodo = async (formData: FormData) => {
    'use server';
    console.log(formData);
    const supabaseUrl = 'https://dndirqzvnhxkbijwftrq.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient( supabaseUrl, supabaseKey);
    const todoItem = formData.get('todo');
    console.log(todoItem);
    if (!todoItem) {
      console.log('doing nothing');
      return;
    }
    // Save todo item to database
    const { data, error } = await supabase.from('todos').insert({
      todo: todoItem,
    });
    console.log(error);
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
     <h2>Server Actions Demo</h2>
        <div>
          <form action={addTodo} >
            <div>
              <label htmlFor="todo">Todo</label>
              <div>
                <input id="todo" name="todo" type="text"
                  placeholder="What needs to be done?"
                  required
                />
              </div>
            </div>
            <div>
              <button type="submit"> Add Todo</button>
            </div>
          </form>
        </div>
    </main>
  );
}

