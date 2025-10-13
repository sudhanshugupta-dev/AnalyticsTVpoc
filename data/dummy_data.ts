export const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // string[]
  datasets: [
    {
      data: [12, 25, 18, 30, 22], // number[]
    },
  ],
};

export const lineData = {
  labels: ['1', '2', '3', '4', '5'], // string[]
  datasets: [
    {
      data: [10, 20, 15, 25, 30], // number[]
      color: (opacity = 1) => `rgba(255,111,97,${opacity})`, // optional
      strokeWidth: 3, // optional
    },
  ],
  legend: ['Session Duration'], // optional
};

export const pieData = [
  { name: 'Home', population: 40, color: '#ff6384', legendFontColor: '#000', legendFontSize: 14 },
  { name: 'Search', population: 25, color: '#36a2eb', legendFontColor: '#000', legendFontSize: 14 },
  { name: 'Profile', population: 35, color: '#ffcd56', legendFontColor: '#000', legendFontSize: 14 },
];
