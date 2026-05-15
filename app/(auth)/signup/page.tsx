'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { APP_NAME, USER_ROLES } from '@/constants';

const perks = [
  'Club management & branding',
  'Team & squad control',
  'Full player profiles & stats',
  'League & tournament management',
];

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-12 bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-red-600/10 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <Link href="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">{APP_NAME}</span>
          </Link>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Start Managing<br />Your Club Today
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Join 250+ rugby clubs already using {APP_NAME} to streamline their operations.
          </p>
          <div className="space-y-4">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">{APP_NAME}</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Create your account</h1>
            <p className="text-slate-400">Get started with {APP_NAME} for free</p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm font-medium">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    type="text"
                    placeholder="Owen"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500/50 h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm font-medium">Last Name</Label>
                <Input
                  type="text"
                  placeholder="Griffiths"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500/50 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm font-medium">Club Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Ironclad RFC"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500/50 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm font-medium">Your Role</Label>
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 focus:border-red-500/50">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {USER_ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value} className="text-white hover:bg-white/5 focus:bg-white/5">
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="email"
                  placeholder="you@club.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500/50 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="password"
                  placeholder="Minimum 8 characters"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500/50 h-11"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white h-11 font-semibold shadow-lg shadow-red-900/30 group mt-2"
            >
              Create Account
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-xs text-slate-500 text-center">
              By creating an account, you agree to our{' '}
              <Link href="#" className="text-slate-400 underline hover:text-white">Terms of Service</Link>
              {' '}and{' '}
              <Link href="#" className="text-slate-400 underline hover:text-white">Privacy Policy</Link>.
            </p>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Already have an account?{' '}
            <Link href="/(auth)/login" className="text-red-400 hover:text-red-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
