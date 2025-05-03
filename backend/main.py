
from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

MODEL_NAME = "bigcode/starcoder2-7b"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32)

class Prompt(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_code(data: Prompt):
    inputs = tokenizer(data.prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_new_tokens=300, temperature=0.7)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": response.replace(data.prompt, "")}

@app.get("/")
def root():
    return {"message": "Code Assistant API is running"}
