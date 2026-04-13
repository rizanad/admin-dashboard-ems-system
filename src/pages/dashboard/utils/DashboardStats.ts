export const getDashboardStats = (
    employees: any[],
    attendance: any[],
    inventory: any[]
  ) => {
    const today = new Date().toISOString().split("T")[0];
  
    const todayAttendance = attendance.filter(a => a.date === today);
  
    const attendanceTrend = attendance.reduce((acc: any, curr) => {
      const day = curr.date;
      if (!acc[day]) {
        acc[day] = { date: day, Present: 0, Absent: 0, Late: 0 };
      }
      acc[day][curr.status]++;
      return acc;
    }, {});
  
    const inventoryBreakdown = {
      Available: inventory.filter(i => i.status === "Available").length,
      Assigned: inventory.filter(i => i.status === "Assigned").length,
      Damaged: inventory.filter(i => i.status === "Damaged").length,
    };
  
    return {
      totalEmployees: employees.length,
      presentToday: todayAttendance.filter(a => a.status === "Present").length,
      absentToday: todayAttendance.filter(a => a.status === "Absent").length,
      lateToday: todayAttendance.filter(a => a.status === "Late").length,
      attendanceTrend: Object.values(attendanceTrend),
      inventoryBreakdown,
    };
  };