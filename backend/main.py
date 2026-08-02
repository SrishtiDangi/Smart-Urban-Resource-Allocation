from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "project":"Smart Urban Resource Allocation Platform",
        "status":"Running"
    }