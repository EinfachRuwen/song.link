"use server"

const API_BASE_URL = "https://api.song.link/v1-alpha.1/links"

export async function getSongLinks(url: string) {
  try {
    const encodedUrl = encodeURIComponent(url)
    const response = await fetch(`${API_BASE_URL}?url=${encodedUrl}&userCountry=US`)

    if (!response.ok) {
      throw new Error("Failed to fetch song links")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching song links:", error)
    throw new Error("Failed to fetch song links")
  }
}

