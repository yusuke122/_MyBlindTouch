#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MyBlindTouch.Data;
using MyBlindTouch.Models;

namespace MyBlindTouch.Controllers
{
    public class QuizModelsController : Controller
    {
        private readonly MyBlindTouchContext _context;

        public QuizModelsController(MyBlindTouchContext context)
        {
            _context = context;
        }

        // GET: QuizModels
        public async Task<IActionResult> Index()
        {
            return View(await _context.QuizModel.ToListAsync());
        }

        // GET: QuizModels/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quizModel = await _context.QuizModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (quizModel == null)
            {
                return NotFound();
            }

            return View(quizModel);
        }

        // GET: QuizModels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: QuizModels/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Level,QuizStr")] QuizModel quizModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(quizModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(quizModel);
        }

        // GET: QuizModels/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quizModel = await _context.QuizModel.FindAsync(id);
            if (quizModel == null)
            {
                return NotFound();
            }
            return View(quizModel);
        }

        // POST: QuizModels/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Level,QuizStr")] QuizModel quizModel)
        {
            if (id != quizModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(quizModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!QuizModelExists(quizModel.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(quizModel);
        }

        // GET: QuizModels/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quizModel = await _context.QuizModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (quizModel == null)
            {
                return NotFound();
            }

            return View(quizModel);
        }

        // POST: QuizModels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var quizModel = await _context.QuizModel.FindAsync(id);
            _context.QuizModel.Remove(quizModel);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool QuizModelExists(int id)
        {
            return _context.QuizModel.Any(e => e.Id == id);
        }
    }
}
