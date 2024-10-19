"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface propsTypes {
    data: any[]
}


export default function JobsChart({data}:propsTypes) {
    const notNull = data.filter(i => i.value !== 0);

    if (notNull.length === 0) {
        return <div>No data available to display.</div>;
    }

    const colors = [
        '#e77c3d', '#f3a76d', '#c65f2b', '#ad3e74',
        '#d0628c', '#8a2c4e', '#f4c7a4', '#9b5b3a',
        '#f9c5b4', '#f0a7b4', '#c9d1c5', '#3d8a8c'
    ];
  return (
<div className="w-full h-[250px]">
<ResponsiveContainer  height="100%" width="100%" className={` z-30`}>
<PieChart  >
      <Pie
        dataKey="value"
        className=''
        startAngle={360}
        endAngle={0}
        data={notNull}
        cx="50%"
        cy="50%"
        outerRadius={70}
        innerRadius={50}
        fill="#e77c3d"
        label={({ name, value }) => `${name}: ${value}`}
      >
        {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
        </Pie>
        <Tooltip/>
    </PieChart>
</ResponsiveContainer>
</div>
  );
}

