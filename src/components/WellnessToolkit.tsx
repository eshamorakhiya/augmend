
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Circle, Timer, Heart, Brain, Shield, Book, Settings } from "lucide-react";
import { PersonalizationSettings } from "./PersonalizationSettings";
import { MilestoneCelebration } from "./MilestoneCelebration";
import { useTheme } from "@/contexts/ThemeContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const WellnessToolkit = () => {
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const { toggleSettingsPanel } = useTheme();

  const moodOptions = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😌", label: "Calm" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "😤", label: "Frustrated" }
  ];

  const quickTools = [
    {
      icon: Circle,
      title: "Breathing Exercise",
      description: "Take a moment to breathe",
      action: () => setIsBreathing(true)
    },
    {
      icon: Heart,
      title: "Self-Compassion",
      description: "Practice kind self-talk",
      action: () => console.log("Self-compassion tool clicked")
    },
    {
      icon: Brain,
      title: "Thought Check",
      description: "Challenge negative thoughts",
      action: () => console.log("Thought check tool clicked")
    },
    {
      icon: Shield,
      title: "Grounding",
      description: "Connect with your senses",
      action: () => console.log("Grounding tool clicked")
    },
    {
      icon: Settings,
      title: "Personalize Dashboard",
      description: "Customize your experience",
      action: () => toggleSettingsPanel()
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathCount(count => {
          if (count >= 10) {
            setIsBreathing(false);
            return 0;
          }
          return count + 1;
        });
      }, 5000); // 5 seconds per breath cycle
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {isBreathing && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4 text-center">Breathing Exercise</h3>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 bg-primary/20 rounded-full mx-auto flex items-center justify-center"
            >
              <span className="text-primary text-lg">
                {breathCount % 2 === 0 ? "Inhale" : "Exhale"}
              </span>
            </motion.div>
            <p className="text-center mt-4 text-muted-foreground">
              Breath {Math.floor(breathCount / 2) + 1} of 5
            </p>
            <button
              onClick={() => setIsBreathing(false)}
              className="mt-6 w-full py-2 px-4 bg-secondary hover:bg-secondary/80 rounded-lg text-foreground transition-colors"
            >
              End Exercise
            </button>
          </div>
        </motion.div>
      )}

      <motion.section variants={item}>
        <h3 className="text-lg font-medium text-foreground mb-4">How are you feeling?</h3>
        <div className="flex flex-wrap gap-4">
          {moodOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setMood(option.label)}
              className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                mood === option.label
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-secondary/50 border-2 border-transparent hover:bg-secondary"
              }`}
            >
              <span className="text-2xl mb-1">{option.emoji}</span>
              <span className="text-sm text-foreground/80">{option.label}</span>
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section variants={item}>
        <h3 className="text-lg font-medium text-foreground">Quick Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickTools.map((tool) => (
            <motion.button
              key={tool.title}
              onClick={tool.action}
              className="flex items-start p-4 content-card hover:shadow-md transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tool.icon className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-medium text-foreground">{tool.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>

      <motion.section variants={item}>
        <PersonalizationSettings />
      </motion.section>

      <motion.section variants={item}>
        <MilestoneCelebration />
      </motion.section>

      <motion.section variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">Daily Reflection</h3>
          <Book className="w-5 h-5 text-primary" />
        </div>
        <p className="text-muted-foreground mb-4">
          What's one small thing you're grateful for today?
        </p>
        <textarea
          className="input-minimal w-full h-32"
          placeholder="Write your thoughts here..."
        />
      </motion.section>
    </motion.div>
  );
};
