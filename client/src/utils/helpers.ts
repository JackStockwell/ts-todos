import { todo } from "../components/TodoList";

// Idb function. Exported for use.
export const idbPromise = (storeName: string, method: string, object: todo) => {
    return new Promise((res, rej) => {
        // Opens the todos DB
        const request = window.indexedDB.open('todos', 1);

        // Function scoped vars
        let db:any, tx:any, store:any;  

        // Creates a todo object store if needed.
        request.onupgradeneeded = function(e: IDBVersionChangeEvent) {
            const db =  request.result;
            db.createObjectStore('todo', { keyPath: 'id' });
        }

        // Error handling
        request.onerror = function(error: object) {
            console.error(error)
        }

        request.onsuccess = function(e: any) {
            db = request.result;
            tx = db.transaction(storeName, 'readwrite');
            store = tx.objectStore(storeName);

            db.onerror = (error: object) => {
                console.log(error)
            }

            switch (method) {
                case 'put':
                    store.put(object);
                    res(object)
                    break;
                case 'get':
                    const allData = store.getAll();
                    allData.onsuccess = () => {
                        res(allData.result)
                    }
                    break;
                case 'delete':
                    store.delete(object.id)
                    break;
            }
        }

    })
}