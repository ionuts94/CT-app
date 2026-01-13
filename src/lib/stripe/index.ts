import Stripe from "stripe"
import { envs } from "@/constants/envs";

export const STRIPE_SECRET_KEY = envs.STRIPE_SECRET_KEY
export const STRIPE_PUBLISHABLE_KEY = envs.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

if (!STRIPE_SECRET_KEY) throw new Error("Stripe secret key is missing")
if (!STRIPE_PUBLISHABLE_KEY) throw new Error("Stripe publishable key is missing")

export const stripe = new Stripe(STRIPE_SECRET_KEY)