import pandas as pd
from sqlalchemy import Integer, Float, String, ForeignKey, Column, func
from sqlalchemy.orm import relationship
from enum import Enum
from database import db
from time import sleep
import os

class PollutantType(Enum):
    O3 = "Ozone"
    CO = "Carbon Monoxide"
    SO2 = "Sulfur Dioxide"
    NO2 = "Nitrogen Dioxide"

POLLUTANT_FIELDS = {
    PollutantType.O3: ["o3_aqi", "o3_mean", "o3_first_max_hour", "o3_max_value"],
    PollutantType.SO2: ["so2_aqi", "so2_mean", "so2_first_max_hour", "so2_max_value"],
    PollutantType.CO: ["co_aqi", "co_mean", "co_first_max_hour", "co_max_value"],
    PollutantType.NO2: ["no2_aqi", "no2_mean", "no2_first_max_hour", "no2_max_value"],
}

class SearchParamns:

    def __init__(self, state=None, county=None, city=None, latitude=None, longitude=None,year=None, month=None, day=None, aqi=None, mean=None, max_value=None, max_hour=None):
        # Location parameters
        self.state = state
        self.county = county
        self.city = city
        self.latitude = latitude
        self.longitude = longitude

        # Date parameters
        self.year = year
        self.month = month
        self.day = day

        # Pollution parameters
        self.aqi = aqi
        self.mean = mean
        self.max_value = max_value
        self.max_hour = max_hour

# Locations Table
class Location(db.Model):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    state = Column(String, nullable=False)
    county = Column(String, nullable=False)
    city = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    pollutants = relationship('Pollutant', back_populates='location')

    @classmethod
    def get_states(self):
        # print("="*80)
        # print("MODELS LINE 57")
        # print(os.getcwd())
        # print("="*80)
        # sleep(30)
        # print("="*80)

        locations = self.query.all()

        locations_df = pd.DataFrame([{"id": location.id, "state": location.state} for location in locations])

        states_df = locations_df.drop_duplicates(subset=["state"]).reset_index(drop=True)
        states_df.id = states_df.index + 1

        return states_df.to_dict(orient="records")
    
    @classmethod
    def get_counties(self):

        locations = self.query.all()

        locations_df = pd.DataFrame([{"id": location.id, "county": location.county} for location in locations])

        counties_df = locations_df.drop_duplicates(subset=["county"]).reset_index(drop=True)
        counties_df.id = counties_df.index + 1

        return counties_df.to_dict(orient="records")

    @classmethod
    def get_cities(self):
        locations = self.query.all()

        locations_df = pd.DataFrame([{"id": location.id, "city": location.city} for location in locations])

        cities_df = locations_df.drop_duplicates(subset=["city"]).reset_index(drop=True)
        cities_df.id = cities_df.index + 1

        return cities_df.to_dict(orient="records")
    
    
    def to_dict(self):
       return {col.name: getattr(self, col.name) for col in self.__table__.columns}
       

# Pollutants Table
class Pollutant(db.Model):
    __tablename__ = "pollutants"

    id = Column(Integer, primary_key=True, autoincrement=True)
    o3_mean = Column(Float)
    o3_max_value = Column(Float)
    o3_first_max_hour = Column(Float)
    o3_aqi = Column(Float)
    co_mean = Column(Float)
    co_max_value = Column(Float)
    co_first_max_hour = Column(Float)
    co_aqi = Column(Float)
    so2_mean = Column(Float)
    so2_max_value = Column(Float)
    so2_first_max_hour = Column(Float)
    so2_aqi = Column(Float)
    no2_mean = Column(Float)
    no2_max_value = Column(Float)
    no2_first_max_hour = Column(Float)
    no2_aqi = Column(Float)
    year = Column(Integer, nullable=False)
    month = Column(Integer, nullable=False)
    day = Column(Integer, nullable=False)

    location_id = Column(Integer, ForeignKey('locations.id'), nullable=False)  
    location = relationship('Location', back_populates='pollutants')

    @classmethod
    def get_pollutans(self, search_params: SearchParamns = None, pollutant_type = PollutantType):
        
        if(pollutant_type == PollutantType.O3):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.o3_aqi),
                    Location.latitude,
                    Location.longitude,
                    Location.state,
                    self.year,
                    self.month,
                    self.day
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.o3_aqi).asc())
            )
        
        if(pollutant_type == PollutantType.CO):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.co_aqi),
                    Location.latitude,
                    Location.longitude,
                    Location.state,
                    self.year,
                    self.month,
                    self.day
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.co_aqi).asc())
            )
            
        if(pollutant_type == PollutantType.SO2):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.so2_aqi),
                    Location.latitude,
                    Location.longitude,
                    Location.state,
                    self.year,
                    self.month,
                    self.day
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.so2_aqi).asc())
            )
        
        if(pollutant_type == PollutantType.NO2):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.no2_aqi),
                    Location.latitude,
                    Location.longitude,
                    Location.state,
                    self.year,
                    self.month,
                    self.day
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.no2_aqi).asc())
            )
        
        

        if search_params.state:
            query = query.filter(Location.state == search_params.state)
        
        if search_params.county:
            query = query.filter(Location.county == search_params.county)

        if search_params.city:
            query = query.filter(Location.city == search_params.city)

        if search_params.longitude:
            query = query.filter(Location.longitude == search_params.longitude)
        
        if search_params.latitude:
            query = query.filter(Location.latitude == search_params.latitude)

        if search_params.year:
            query = query.filter(self.year == search_params.year)

        if search_params.month:
            query = query.filter(self.month == search_params.month)   
        
        if search_params.day:
            query = query.filter(self.day == search_params.day)

        if search_params.aqi:
            match pollutant_type:

                case PollutantType.O3: 
                    query = query.filter(self.o3_aqi == search_params.aqi)
                
                case PollutantType.SO2: 
                    query = query.filter(self.so2_aqi == search_params.aqi)

                case PollutantType.CO: 
                    query = query.filter(self.co_aqi == search_params.aqi)
                
                case PollutantType.NO2: 
                    query = query.filter(self.no2_aqi == search_params.aqi)
            
        if search_params.mean:
            match pollutant_type:

                case PollutantType.O3: 
                    query = query.filter(self.o3_mean == search_params.mean)
                
                case PollutantType.SO2: 
                    query = query.filter(self.so2_mean == search_params.mean)

                case PollutantType.CO: 
                    query = query.filter(self.co_mean == search_params.mean)
                
                case PollutantType.NO2: 
                    query = query.filter(self.no2_mean == search_params.mean)
    
        if search_params.max_value:
            match pollutant_type:

                case PollutantType.O3: 
                    query = query.filter(self.o3_max_value == search_params.max_value)
                
                case PollutantType.SO2: 
                    query = query.filter(self.so2_max_value == search_params.max_value)

                case PollutantType.CO: 
                    query = query.filter(self.co_max_value == search_params.max_value)
                
                case PollutantType.NO2: 
                    query = query.filter(self.no2_max_value == search_params.max_value)


        if search_params.max_hour:
            match pollutant_type:

                case PollutantType.O3: 
                    query = query.filter(self.o3_first_max_hour == search_params.max_hour)
                
                case PollutantType.SO2: 
                    query = query.filter(self.so2_first_max_hour == search_params.max_hour)

                case PollutantType.CO: 
                    query = query.filter(self.co_first_max_hour == search_params.max_hour)
                
                case PollutantType.NO2: 
                    query = query.filter(self.no2_first_max_hour == search_params.max_hour)

        return query.all()     

    @classmethod
    def get_top_cleanest_cities(self, pollutant_type: PollutantType):
        if(pollutant_type == PollutantType.O3):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.o3_aqi)
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.o3_aqi).asc())
                .limit(10)
            )
        
        if(pollutant_type == PollutantType.CO):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.co_aqi)
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.co_aqi).asc())
                .limit(10)
            )
            
        if(pollutant_type == PollutantType.SO2):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.so2_aqi)
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.so2_aqi).asc())
                .limit(10)
            )
        
        if(pollutant_type == PollutantType.NO2):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.no2_aqi)
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.no2_aqi).asc())
                .limit(10)
            )

        return query.all()
    
    @classmethod
    def get_top_dirtiest_cities(self, pollutant_type: PollutantType):
        if(pollutant_type == PollutantType.O3):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.o3_aqi)
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.o3_aqi).desc())
                .limit(10)
            )
        
        if(pollutant_type == PollutantType.CO):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.co_aqi)
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.co_aqi).desc())
                .limit(10)
            )

        if(pollutant_type == PollutantType.SO2):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.so2_aqi)
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.so2_aqi).desc())
                .limit(10)
            )
        
        if(pollutant_type == PollutantType.NO2):
            query = (
                db.session.query(
                    Location.city,
                    func.avg(self.no2_aqi)
                )
                .join(self, self.location_id == Location.id)
                .group_by(Location.city)
                .order_by(func.avg(self.no2_aqi).desc())
                .limit(10)
            )

        return query.all()
    
    @classmethod
    def get_timeline(self, pollutant_type: PollutantType):
        if(pollutant_type == PollutantType.O3):
            query = (
                db.session.query(
                    self.year,
                    func.avg(self.o3_aqi)
                )
                .group_by(self.year)
                .order_by(self.year.asc())
            )
        
        if(pollutant_type == PollutantType.CO):
           query = (
                db.session.query(
                    self.year,
                    func.avg(self.co_aqi)
                )
                .group_by(self.year)
                .order_by(self.year.asc())
            )

        if(pollutant_type == PollutantType.SO2):
            query = (
                db.session.query(
                    self.year,
                    func.avg(self.so2_aqi)
                )
                .group_by(self.year)
                .order_by(self.year.asc())
            )
        
        if(pollutant_type == PollutantType.NO2):
            query = (
                db.session.query(
                    self.year,
                    func.avg(self.no2_aqi)
                )
                .group_by(self.year)
                .order_by(self.year.asc())
            )

        return query.all()


    def to_dict(self):
        data = {col.name: getattr(self, col.name) for col in self.__table__.columns}
    
        if self.location:
            data['location'] = {
                "state": self.location.state,
                "county": self.location.county,
                "city": self.location.city,
                "latitude": self.location.latitude,
                "longitude": self.location.longitude,
        }
            
        return data