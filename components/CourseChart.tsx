/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { useEffect, useState } from "react"
// import { Bar } from "react-chartjs-2"
// import { useTheme } from "next-themes"

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js"

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

// export default function CourseChart() {

//   const [data,setData] = useState<number[]>([])
//   const { theme } = useTheme()

//   useEffect(()=>{
//     fetch("/api/course-chart")
//     .then(res=>res.json())
//     .then(setData)
//   },[])

//   const textColor = theme === "dark" ? "#fff" : "#000"

//   const chartData = {
//     labels:[
//       "Jan","Feb","Mar","Apr","May","Jun",
//       "Jul","Aug","Sep","Oct","Nov","Dec"
//     ],
//     datasets:[
//       {
//         label:"Courses Added",
//         data:data,
//         backgroundColor: theme === "dark"
//           ? "rgb(99,102,241)"
//           : "rgb(59,130,246)",
//         borderRadius:6
//       }
//     ]
//   }

//   const options = {
//     responsive:true,
//     plugins:{
//       legend:{
//         labels:{
//           color:textColor
//         }
//       },
//       title:{
//         display:true,
//         text:"Courses Added Per Month",
//         color:textColor
//       }
//     },
//     scales:{
//       x:{
//         ticks:{
//           color:textColor
//         }
//       },
//       y:{
//         ticks:{
//           color:textColor
//         }
//       }
//     }
//   }

//   return (
//     <div className="rounded-xl border bg-background p-6">
//       <Bar data={chartData} options={options}/>
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { useTheme } from "next-themes"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function CourseChart() {

  const [data,setData] = useState<number[]>(new Array(12).fill(0))
  const { theme } = useTheme()

  useEffect(()=>{

    const loadChart = async ()=>{

      try{

        const res = await fetch("/api/course-chart")
        const result = await res.json()

        const months = new Array(12).fill(0)

        result.forEach((value:number,index:number)=>{
          months[index] = value
        })

        setData(months)

      }catch(error){

        console.error(error)

      }

    }

    loadChart()

  },[])

  const textColor = theme === "dark" ? "#fff" : "#000"

  const chartData = {
    labels:[
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    datasets:[
      {
        label:"Courses Added",
        data:data,
        borderColor:"rgb(99,102,241)",
        backgroundColor:"rgba(99,102,241,0.2)",
        tension:0.4,
        fill:true,
        pointRadius:5,
        pointBackgroundColor:"rgb(99,102,241)"
      }
    ]
  }

  const options:any = {
    responsive:true,
    plugins:{
      legend:{
        labels:{
          color:textColor
        }
      },
      title:{
        display:true,
        text:"Courses Added Per Month",
        color:textColor
      }
    },
    scales:{
      x:{
        ticks:{
          color:textColor
        },
        grid:{
          color: theme==="dark" ? "#333" : "#e5e7eb"
        }
      },
      y:{
        beginAtZero:true,
        ticks:{
          color:textColor
        },
        grid:{
          color: theme==="dark" ? "#333" : "#e5e7eb"
        }
      }
    }
  }

  return (

    <div className="rounded-xl border bg-background p-6">

      <h2 className="text-xl font-semibold mb-6">
        Course Analytics
      </h2>

      <Line data={chartData} options={options} />

    </div>

  )

}