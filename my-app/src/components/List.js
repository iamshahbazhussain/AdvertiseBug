const List = ({ data, getIndex, check, id, columnId }) => {
    const handleCardClick = (column, row) => {
      console.log("columnId : ", columnId);
      console.log("id : ", check);
  
      getIndex(column, row);
    };
    return (
      <div className="d-flex flex-column">
        {data.map((number, index) => {
          return (
            <div className="card">
              <div
                className={`card-body ${
                  check.hasOwnProperty(id) && index === check[id] ? "bg-danger" : ""
                }`}
                onClick={() => handleCardClick(id, index)}
              >
                <h3>{number}</h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default List;