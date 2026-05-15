'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { APP_NAME } from '@/constants';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">{APP_NAME}</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Welcome back</h1>
            <p className="text-slate-400">Sign in to your club management account</p>
          </div>

          <form className="space-y-5">
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
              <div className="flex items-center justify-between">
                <Label className="text-slate-300 text-sm font-medium">Password</Label>
                <Link href="/(auth)/forgot-password" className="text-red-400 hover:text-red-300 text-xs transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500/50 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white h-11 font-semibold shadow-lg shadow-red-900/30 group"
            >
              Sign In
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <Separator className="flex-1 bg-white/10" />
            <span className="text-slate-500 text-xs">OR</span>
            <Separator className="flex-1 bg-white/10" />
          </div>

          {/* Social auth placeholders */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full border-white/10 text-slate-300 hover:text-white hover:bg-white/5 h-11">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </Button>
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            Don't have an account?{' '}
            <Link href="/(auth)/signup" className="text-red-400 hover:text-red-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>

          {/* Role notice */}
          <div className="mt-6 p-4 rounded-xl bg-white/3 border border-white/5">
            <p className="text-xs text-slate-500 text-center">
              Access is role-based: Club Admin · Coach · Player · Parent · Fan
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right panel - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-red-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-600/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-red-800/10 blur-3xl" />
        </div>
        <div className="relative flex flex-col items-center justify-center w-full px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-900/50">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">
              Your Club.<br />Your Way.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              The complete management platform built specifically for rugby clubs and organisations.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
