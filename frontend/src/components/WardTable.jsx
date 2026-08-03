function WardTable() {

const wards=[

{
ward:"Ward-1",
population:8500,
waste:"420 kg",
overflow:"Yes"
},

{
ward:"Ward-2",
population:5200,
waste:"180 kg",
overflow:"No"
},

{
ward:"Ward-3",
population:7300,
waste:"390 kg",
overflow:"Yes"
},

{
ward:"Ward-4",
population:4100,
waste:"150 kg",
overflow:"No"
},

];

return(

<div
style={{
background:"white",
padding:"20px",
marginTop:"30px",
borderRadius:"12px",
boxShadow:"0 0 10px rgba(0,0,0,.15)"
}}
>

<h2>Ward Status</h2>

<table
style={{
width:"100%",
borderCollapse:"collapse"
}}
>

<thead>

<tr>

<th>Ward</th>

<th>Population</th>

<th>Waste</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

wards.map((item,index)=>(

<tr key={index}>

<td>{item.ward}</td>

<td>{item.population}</td>

<td>{item.waste}</td>

<td>{item.overflow}</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}

export default WardTable;