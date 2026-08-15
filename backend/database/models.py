from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database.connection import Base
import datetime


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True,
        index=True
    )

    hashed_password = Column(String)

    is_admin = Column(
        Boolean,
        default=False
    )


class Bin(Base):

    __tablename__ = "bins"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    bin_code = Column(
        String,
        unique=True,
        index=True
    )

    latitude = Column(Float)

    longitude = Column(Float)

    population_nearby = Column(Integer)

    capacity_kg = Column(Float)

    predictions = relationship(
        "Prediction",
        back_populates="bin"
    )


class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    bin_id = Column(
        Integer,
        ForeignKey("bins.id")
    )

    timestamp = Column(
        DateTime,
        default=datetime.datetime.utcnow
    )

    # Context

    rainfall_mm = Column(Float)

    temperature_c = Column(Float)

    is_holiday = Column(Boolean)

    hours_since_last_collection = Column(Float)

    current_fill_percentage = Column(Float)

    # AI Output

    overflow_probability = Column(Float)

    will_overflow = Column(Boolean)

    # SHAP Explanation

    explanation_json = Column(
        String,
        nullable=True
    )

    bin = relationship(
        "Bin",
        back_populates="predictions"
    )


class Allocation(Base):

    __tablename__ = "allocations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    date = Column(
        DateTime,
        default=datetime.datetime.utcnow
    )

    truck_id = Column(String)

    route_json = Column(String)

    cost_estimated = Column(Float)

    fuel_estimated_liters = Column(Float)