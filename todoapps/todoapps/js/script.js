// TODO APPS
// 1. Buatlah sebuah aplikasi todo sederhana dengan menggunakan event listener pada form submit
// 2. Setiap kali form disubmit, buatlah sebuah object todo dengan properti id, task, timestamp, dan isCompleted
// 3. Simpan object todo tersebut ke dalam array todos
// 4. Setelah itu, dispatch sebuah custom event dengan nama 'render-todo' untuk merender ulang daftar todo yang ada



document.addEventListener('DOMContentLoaded', function () {// Menunggu hingga seluruh konten halaman selesai dimuat
  const submitForm = document.getElementById('form');// Mengambil elemen form dengan id 'form'

  const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';
 


  // Menambahkan event listener untuk form submit
  submitForm.addEventListener('submit', function () {
    event.preventDefault();// supaya halaman tidak reload ketika form disubmit
    addTodo();// memanggil fungsi addTodo untuk menambahkan todo baru


    // Fungsi untuk menambahkan todo baru
function addTodo() {
  const textTodo = document.getElementById('title').value;// mengambil nilai dari input dengan id 'title'
  const timestamp = document.getElementById('date').value;// mengambil nilai dari input dengan id 'date'
 
  const generatedID = generateId();// menghasilkan id unik untuk setiap todo

  // Membuat object todo baru dengan properti id, task, timestamp, dan isCompleted
  const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
  // Array untuk menyimpan daftar todo
const todos = [];
  todos.push(todoObject);// menyimpan object todo ke dalam array todos
 
  const RENDER_EVENT = 'render-todo';// Nama custom event untuk merender ulang daftar todo
 document.dispatchEvent(new Event(RENDER_EVENT));// dispatch custom event 'render-todo' untuk merender ulang daftar todo
 saveData();
// Menambahkan event listener untuk custom event 'render-todo'
document.addEventListener(RENDER_EVENT, function () {
 
  // Mengambil elemen dengan id 'todos' untuk menampilkan daftar todo yang belum selesai
  const uncompletedTODOList = document.getElementById('todos');
  uncompletedTODOList.innerHTML = '';// Mengosongkan konten elemen sebelum merender ulang daftar todo
 
  const completedTODOList = document.getElementById('completed-todos');// Mengambil elemen dengan id 'completed-todos' untuk menampilkan daftar todo yang sudah selesai
  completedTODOList.innerHTML = '';// Mengosongkan konten elemen sebelum mer

  // Melakukan iterasi pada array todos untuk membuat elemen HTML dari setiap object todo dan menambahkannya ke dalam elemen dengan id 'todos'
  for (const todoItem of todos) {
    const todoElement = makeTodo (todoItem);// Membuat elemen HTML dari object todo menggunakan fungsi makeTodo
  if(!todoItem.isCompleted){// Jika status isCompleted adalah false, tambahkan elemen HTML ke dalam elemen dengan id 'todos'
    uncompletedTODOList.append(todoElement);// Menambahkan elemen HTML yang telah dibuat ke dalam elemen dengan id 'todos'
  } else {
    completedTODOList.append(todoElement);// Jika status isCompleted adalah true, tambahkan elemen HTML ke dalam elemen dengan id 'completed-todos'
} 
}
})

// Fungsi untuk menghasilkan id unik
function generateId() {
  return +new Date();// menghasilkan id unik berdasarkan timestamp saat ini
}
 
// Fungsi untuk membuat object todo
function generateTodoObject(id, teks, waktu, isCompleted) {
  // Membuat object todo dengan properti id, task, timestamp, dan isCompleted
  return {// Mengembalikan object todo
    id,
   teks,
    waktu,
    isCompleted
  }
}
 
// Fungsi untuk membuat elemen HTML dari object todo
function makeTodo(todoObject) {
  const textTitle = document.createElement('h2');// Membuat elemen h2 untuk menampilkan judul tugas
  textTitle.innerText = todoObject.teks;// Mengatur teks dari elemen h2 dengan nilai teks dari object todo
 
  const textTimestamp = document.createElement('p');// Membuat elemen p untuk menampilkan timestamp tugas
  textTimestamp.innerText = todoObject.waktu;// Mengatur teks dari elemen p dengan nilai waktu dari object todo
 
  const textContainer = document.createElement('div');// Membuat elemen div untuk mengelompokkan judul dan timestamp
  textContainer.classList.add('inner');// Menambahkan kelas 'inner' ke elemen div
  textContainer.append(textTitle, textTimestamp);// Menambahkan elemen h2 dan p ke dalam elemen div
 
  const container = document.createElement('div');// Membuat elemen div untuk mengelompokkan seluruh konten todo
  container.classList.add('item', 'shadow');// Menambahkan kelas 'item' dan 'shadow' ke elemen div
  container.append(textContainer);// Menambahkan elemen div yang berisi judul dan timestamp ke dalam elemen div utama
  container.setAttribute('id', `todo-${todoObject.id}`);// Menambahkan atribut id ke elemen div utama dengan format 'todo-{id}'
 



  // Menambahkan tombol aksi berdasarkan status isCompleted dari object todo
if (todoObject.isCompleted) {// Jika status isCompleted adalah true, tambahkan tombol undo dan hapus
    const undoButton = document.createElement('button');// Membuat elemen button untuk tombol undo
    undoButton.classList.add('undo-button');// Menambahkan kelas 'undo-button' ke elemen button
 
    undoButton.addEventListener('click', function () {// Menambahkan event listener untuk tombol undo
      undoTaskFromCompleted(todoObject.id);// Memanggil fungsi undoTaskFromCompleted untuk mengubah status isCompleted menjadi false
    });
 
    const trashButton = document.createElement('button');// Membuat elemen button untuk tombol hapus
    trashButton.classList.add('trash-button');// Menambahkan kelas 'trash-button' ke elemen button
 
    trashButton.addEventListener('click', function () {// Menambahkan event listener untuk tombol hapus
      removeTaskFromCompleted(todoObject.id);// Memanggil fungsi removeTaskFromCompleted untuk menghapus object todo dari array todos
    });
 
    container.append(undoButton, trashButton);// Menambahkan tombol undo dan hapus ke dalam elemen div utama
  } else {// Jika status isCompleted adalah false, tambahkan tombol centang
    const checkButton = document.createElement('button');// Membuat elemen button untuk tombol centang
    checkButton.classList.add('check-button');// Menambahkan kelas 'check-button' ke elemen button
    
    checkButton.addEventListener('click', function () {// Menambahkan event listener untuk tombol centang
      addTaskToCompleted(todoObject.id);// Memanggil fungsi addTaskToCompleted untuk mengubah status isCompleted menjadi true
    });
    
    container.append(checkButton);// Menambahkan tombol centang ke dalam elemen div utama
  }
 
  return container;// Mengembalikan elemen HTML yang telah dibuat untuk object todo
}

function addTaskToCompleted (todoId) {// Fungsi untuk mengubah status isCompleted menjadi true
  const todoTarget = findTodo(todoId);// Mencari object todo berdasarkan id menggunakan fungsi findTodo
 
  if (todoTarget == null) return;// Jika object todo tidak ditemukan, hentikan eksekusi fungsi
 
  todoTarget.isCompleted = true;// Mengubah status isCompleted menjadi true
  document.dispatchEvent(new Event(RENDER_EVENT));// Dispatch custom event 'render-todo' untuk merender ulang daftar todo
  saveData();
}

//
function findTodo(todoId) {// Fungsi untuk mencari object todo berdasarkan id 
  for (const todoItem of todos) {// Melakukan iterasi pada array todos
    if (todoItem.id === todoId) {// Jika id dari object todo sama dengan id yang dicari, kembalikan object todo tersebut
      return todoItem;// Mengembalikan object todo yang ditemukan
    }
  }
  return null;// Jika object todo tidak ditemukan, kembalikan null
}

// Fungsi untuk mencari index object todo berdasarkan id
function removeTaskFromCompleted(todoId) {// Fungsi untuk menghapus object todo dari array todos berdasarkan id 
  const todoTarget = findTodoIndex(todoId);// Mencari index object todo berdasarkan id menggunakan fungsi findTodoIndex
 
  if (todoTarget === -1) return;// Jika index object todo tidak ditemukan, hentikan eksekusi fungsi
 
  todos.splice(todoTarget, 1);// Menghapus object todo dari array todos menggunakan metode splice
  document.dispatchEvent(new Event(RENDER_EVENT));// Dispatch custom event 'render-todo' untuk merender ulang daftar todo
  saveData();
}
 
 // Fungsi untuk mencari index object todo berdasarkan id
function undoTaskFromCompleted(todoId) {// Fungsi untuk mengubah status isCompleted menjadi false
  const todoTarget = findTodo(todoId);// Mencari object todo berdasarkan id menggunakan fungsi findTodo
 
  if (todoTarget == null) return;// Jika object todo tidak ditemukan, hentikan eksekusi fungsi
 
  todoTarget.isCompleted = false;// Mengubah status isCompleted menjadi false
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
// Fungsi untuk mencari index object todo berdasarkan id
function findTodoIndex(todoId) {//
  for (const index in todos) {// Melakukan iterasi pada array todos menggunakan index
    if (todos[index].id === todoId) {// Jika id dari object todo sama dengan id yang dicari, kembalikan index object todo tersebut
      return index; 
    }
  }
 
  return -1;// Jika object todo tidak ditemukan, kembalikan -1
}



function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});


function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}

if(isStorageExist()){
  loadDataFromStorage();
}

};
  });

});
