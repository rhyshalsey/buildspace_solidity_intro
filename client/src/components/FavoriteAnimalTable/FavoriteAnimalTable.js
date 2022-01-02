const FavoiteAnimalTable = ({ data }) => {
  if (!data || data.length <= 0) {
    return null;
  }

  console.log(data);

  return (
    <table className="favoriteAnimalTable">
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map((key) => {
              const value = row[key];
              return (
                <td className={key} key={value}>
                  {value.includes("0x") ? (
                    <a
                      href={`https://rinkeby.etherscan.io/address/${value}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FavoiteAnimalTable;
