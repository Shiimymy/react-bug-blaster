import React, { useState, useEffect } from "react";

export default function TicketForm({ dispatch, editingTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  /*Reset the form */
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  /*Logic to add a new ticket */
  const handleSubmit = (e) => {
    e.preventDefault();

    /*Ticket Object data from the State*/
    const ticketData = {
      /*Check if edit or create new ticket */
      id: editingTicket ? editingTicket.id : new Date().toISOString(),
      title,
      description,
      priority,
    };

    dispatch({
      /*Check if edit or create new ticket */
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticketData,
    });
    clearForm();
  };

  const handleCancelEdit = () => {
    dispatch({ type: "CLEAR_EDITING_TICKET" });
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>

      <div>
        <label>Description</label>
        <textarea
          type="text"
          value={description}
          className="form-input"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>

        {Object.entries(priorityLabels).map(([value, label]) => (
          <label key={value} className="priority-label">
            <input
              type="radio"
              value={value}
              checked={priority === value}
              className="priority-input"
              onChange={(e) => setPriority(e.target.value)}
            ></input>
            {label}
          </label>
        ))}
      </fieldset>

      <button type="submit" className="button">
        Submit
      </button>

      {editingTicket && (
        <button className="button" onClick={handleCancelEdit}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}
