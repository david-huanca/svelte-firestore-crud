<script>
  import { db } from "./firebase";
  import toastr from "toastr";

  let task = {
    name: "",
    description: "",
  };

  let editStatus = false;
  let currentTaskId;
  let tasks = [];

  db.collection("tasks").onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    tasks = [...docs];
  });
  const addTask = async () => {
    await db
      .collection("tasks")
      .doc()
      .set({ ...task, createAt: Date.now() });
    console.log("New task created");
  };

  const updateTask = async () => {
    await db.collection("tasks").doc(currentTaskId).update(task);

    toastr.success("Product updated successfully", {});
    editStatus = false;
  };
  const handleSubmit = () => {
    if (!editStatus) {
      addTask();
    } else {
      updateTask();
    }

    task = { name: "", description: "" };
  };

  const deleteTask = async (id) => {
    await db.collection("tasks").doc(id).delete();
  };
  const editTask = (currentTask) => {
    editStatus = true;
    task.name = currentTask.name;
    task.description = currentTask.description;
    currentTaskId = currentTask.id;
  };

  const onCancel = (id) => {
    editStatus = false;
    task = { name: "", description: "" };
  };
</script>

<style>
</style>

<div class="container p-4">
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <form on:submit|preventDefault={handleSubmit} class="card card-body">
        <div class="form-group">
          <input
            bind:value={task.name}
            type="text"
            placeholder="Write new task"
            class="form-control" />
        </div>
        <div class="form-group">
          <textarea
            bind:value={task.description}
            rows="3"
            placeholder="Write a task description"
            class="form-control" />
        </div>
        <button class="btn btn-primary">
          {#if !editStatus}Save{:else}Update{/if}
        </button>

        {#if editStatus}
          <button
            on:click={onCancel(task.id)}
            class="btn btn-info">Cancel</button>
        {/if}
      </form>

      {#each tasks as task}
        <div class="card card-body mt-2">
          <div class="d-flex justify-content-between">
            <h5>{task.name}</h5>
            <i
              on:click={editTask(task)}
              class="material-icons"
              style="vertical-align:middle;">edit</i>
          </div>

          <p>{task.description}</p>
          <button on:click={deleteTask(task.id)} class="btn btn-danger">
            <i
              class="material-icons"
              style="vertical-align:middle;">delete_forever</i>
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>
