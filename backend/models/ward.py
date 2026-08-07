from sqlalchemy import Column,Integer,String,Float

from database.connection import Base



class Ward(Base):

    __tablename__="wards"


    id = Column(
        Integer,
        primary_key=True
    )


    name = Column(
        String
    )


    population = Column(
        Integer
    )


    waste = Column(
        String
    )


    fill = Column(
        Float
    )


    status = Column(
        String
    )


    distance = Column(
        Float
    )


    eta = Column(
        Integer
    )


    fuel_saved = Column(
        Float
    )


    cost_saved = Column(
        Integer
    )


    truck = Column(
        String
    )