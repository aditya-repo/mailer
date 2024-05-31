const vaccepted = (itemdetails) => {
    var htmlString = `
    <tbody>
    <tr>
        <td style="width: 20px; text-align: center; height: 28px; border: 1px solid black;">
            <b>SL. No</b><br>
        </td>
        <td style="width: 200px; text-align: center; border: 1px solid black;">
            <div><b>ITEMS</b><br></div>
        </td>
        <td style="width: 30px; text-align: center; border: 1px solid black;">
            <div><b>QTY</b><br></div>
        </td>
    </tr>
`;


    // Use a loop to add items dynamically
    for (var i = 0; i < itemdetails.length; i++) {
        htmlString += `
            <tr>
                <td style="width: 20px; text-align: center; height: 28px; border: 1px solid black;">
                    <div>${i + 1}<br></div>
                </td>
                <td style="width: 200px; padding-left: 16px; border: 1px solid black;">
                    <div>${itemdetails[i].itemname}<br></div>
                </td>
                <td style="width: 30px; text-align: center; border: 1px solid black;">
                    <div>${itemdetails[i].quantity}<br></div>
                </td>
            </tr>
        `;
    }

    htmlString += `
        </tbody>
    `;

    return htmlString;
}

module.exports = vaccepted;