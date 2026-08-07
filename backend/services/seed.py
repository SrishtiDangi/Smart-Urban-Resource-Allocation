from database.connection import SessionLocal
from models.ward import Ward



db=SessionLocal()



data=[

Ward(
name="Ward-1",
population=8500,
waste="420 kg",
fill=92,
status="Critical",
distance=8.4,
eta=8,
fuel_saved=14,
cost_saved=1850,
truck="T-04"
),


Ward(
name="Ward-2",
population=6000,
waste="250 kg",
fill=60,
status="Warning",
distance=5.2,
eta=12,
fuel_saved=8,
cost_saved=900,
truck="T-02"
)

]


db.add_all(data)

db.commit()

print("Database seeded")