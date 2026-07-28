mport { Router  } from 'express';
import passport from 'passport';

const router = Router();

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email']  }));
// Callback al que GitHub redirige tras la autenticación
router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/'  }),
        (req, res) => {
            // Redirige al usuario a la documentación o panel principal al tener éxito
            res.redirect('/api-docs');
        }
    );

// Ruta para cerrar sesión
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err);  }
        res.redirect('/');
        });
    });

export default router;



