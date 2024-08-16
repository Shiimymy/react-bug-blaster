export default function ticketReducer(state, action) {
  /*Reducer Logic*/
  switch (action.type) {
    case "ADD_TICKET":
      return { ...state, ticket: [...state.ticket, action.payload] };
    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.ticket.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };
    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.ticket.filter(
          (ticket) => ticket.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
