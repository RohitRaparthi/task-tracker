const { openDb } = require('../db/database');

function getInsights() {
  return new Promise((resolve, reject) => {
    const db = openDb();

    const insights = { totalOpen: 0, byPriority: {}, dueSoon: 0 };
    const today = new Date();
    const isoToday = today.toISOString().split('T')[0];
    const iso3 = new Date(today.getTime() + 3 * 86400000).toISOString().split('T')[0];

    db.serialize(() => {
      db.get("SELECT COUNT(*) as total FROM tasks WHERE status='Open'", (err1, row1) => {
        if (err1) return reject(err1);
        insights.totalOpen = row1.total;

        db.all("SELECT priority, COUNT(*) as count FROM tasks GROUP BY priority", (err2, rows2) => {
          if (err2) return reject(err2);
          rows2.forEach(r => (insights.byPriority[r.priority] = r.count));

          db.get("SELECT COUNT(*) as count FROM tasks WHERE due_date BETWEEN ? AND ?", [isoToday, iso3], (err3, row3) => {
            if (err3) return reject(err3);
            insights.dueSoon = row3.count;

            const summary = `You have ${insights.totalOpen} open tasks. ${insights.dueSoon} task(s) due soon.`;
            db.close();
            resolve({ ...insights, summary });
          });
        });
      });
    });
  });
}

module.exports = { getInsights };
