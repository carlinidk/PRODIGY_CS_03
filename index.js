import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import zxcvbn from "zxcvbn";

const generateStrongPassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=<>?";
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const getTimeToCrack = (crackTime) => {
  if (crackTime < 60) return "Instantly";
  if (crackTime < 3600) return "Few minutes";
  if (crackTime < 86400) return "Few hours";
  if (crackTime < 2592000) return ${Math.round(crackTime / 86400)} days;
  if (crackTime < 31536000) return ${Math.round(crackTime / 2592000)} months;
  return ${Math.round(crackTime / 31536000)} years;
};

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [suggestedPassword, setSuggestedPassword] = useState("");

  const passwordStrength = zxcvbn(password);
  const strengthLevels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const bgColors = ["bg-red-600", "bg-orange-500", "bg-yellow-400", "bg-green-500", "bg-blue-600"];
  
  return (
    <motion.div 
      className={flex flex-col items-center justify-center min-h-screen ${bgColors[passwordStrength.score]} p-6 transition-colors duration-500}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 max-w-md w-full shadow-lg rounded-2xl bg-white">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-center">🔐 Password Strength Checker</h2>
          <Input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 w-full"
          />
          <Progress value={(passwordStrength.score + 1) * 20} className="h-2 rounded-full" />
          <p className={text-lg font-medium text-center ${passwordStrength.score < 2 ? "text-red-600" : "text-green-600"}}>
            {strengthLevels[passwordStrength.score]} - {getTimeToCrack(passwordStrength.crack_times_seconds.offline_slow_hashing_1e4_per_second)} to crack
          </p>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
            onClick={() => setSuggestedPassword(generateStrongPassword())}
          >
            🔄 Suggest Strongest Password
          </Button>
          {suggestedPassword && (
            <div className="mt-3 p-3 bg-gray-100 rounded-lg text-center text-sm font-mono">
              {suggestedPassword}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
} 
