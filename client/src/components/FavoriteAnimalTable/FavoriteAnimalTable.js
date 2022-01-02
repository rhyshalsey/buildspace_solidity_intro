const FavoiteAnimalTable = ({ data }) => {
  if (!data || data.length <= 0) {
    return null;
  }

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
            {Object.values(row).map((value) => (
              <td key={value}>
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
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FavoiteAnimalTable;
