export default function ticketReducer(state, action) {
  /*Reducer Logic*/
  switch (action.type) {
    case "ADD_TICKET":
      return { ...state, tickets: [...state.tickets, action.payload] };
    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };
    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket.id !== action.payload.id
        ),
      };

    case "SET_EDITING_TICKET":
      /* Edit mode -
      Submit information about which ticket is edited*/
      return {
        ...state,
        editingTicket: action.payload,
      };

    case "CLEAR_EDITING_TICKET":
      /*Not in Edit mode -
      Set the infomation that the ticket is no longer being edited */
      return {
        ...state,
        editingTicket: null,
      };
    default:
      return state;
  }
}
