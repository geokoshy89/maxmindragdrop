import { Pie } from "react-chartjs-2";

function PieChart({ chartData, id }: any){
  return (
    <div style={{width: '100%', borderColor: '#222222', borderWidth: '2px', borderStyle: 'solid'}}>
      <h2 style={{ textAlign: "center",color: 'white' }}>Pie Chart {id}</h2>
      <div style={{height: '340px'}}>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
      </div>
    </div>
  );
}
export default PieChart;