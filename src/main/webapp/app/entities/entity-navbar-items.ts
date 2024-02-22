import NavbarItem from 'app/layouts/navbar/navbar-item.model';

export const EntityNavbarItems: NavbarItem[] = [
  {
    name: 'UsuariosRegistrados',
    route: '/usuarios-registrados',
    translationKey: 'global.menu.entities.usuariosRegistrados',
  },
  {
    name: 'CadastroUsuarios',
    route: '/cadastro-usuarios',
    translationKey: 'global.menu.entities.cadastroUsuarios',
  },
  {
    name: 'LogAcesso',
    route: '/log-acesso',
    translationKey: 'global.menu.entities.logAcesso',
  },
];
