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
        editingTicket: null,
      };
    case "DELETE_TICKET":
      if (state.editingTicket && state.editingTicket.id === action.payload.id) {
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket) => ticket.id !== action.payload.id
          ),
          editingTicket: null,
        };
      } else {
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket) => ticket.id !== action.payload.id
          ),
        };
      }

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

    case "SET_SORTING":
      return {
        ...state,
        sortPreference: action.payload,
      };
    default:
      return state;
  }
}
