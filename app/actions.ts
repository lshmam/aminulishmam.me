"use server"

import fs from "fs/promises"
import path from "path"

const messagesFile = path.join(process.cwd(), "messages.json")

export async function addMessage(message: string) {
  const newMessage = {
    id: Date.now(),
    content: message,
    timestamp: new Date().toISOString(),
  }

  try {
    let messages = []
    try {
      const data = await fs.readFile(messagesFile, "utf8")
      messages = JSON.parse(data)
    } catch (error) {
      // File doesn't exist or is empty, start with an empty array
    }

    messages.push(newMessage)
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2))
  } catch (error) {
    console.error("Error adding message:", error)
    throw new Error("Failed to add message")
  }
}

export async function getMessages() {
  try {
    try {
      await fs.access(messagesFile)
    } catch (error) {
      // File doesn't exist, create it with an empty array
      await fs.writeFile(messagesFile, "[]")
    }

    const data = await fs.readFile(messagesFile, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading messages:", error)
    return []
  }
}

