import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const courseRouter = createTRPCRouter({
  createCourse: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const course = await ctx.prisma.course.create({
        data: {
          title: input.title,
          description: input.description,
          userId
        }
      });

      return course;
    }),

  getCourses: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.prisma.course.findMany({
      where: {
        userId: ctx.session.user.id
      }
    });

    return courses;
  })
});
