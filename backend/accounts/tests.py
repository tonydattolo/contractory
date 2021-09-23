from django.contrib.auth import get_user_model
from django.test import TestCase


class UsersManagersTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(publicAddress='0xA92D81d1Af416C80610D9458B38cCc3a46443b19', password='foo')
        self.assertEqual(user.publicAddress, '0xA92D81d1Af416C80610D9458B38cCc3a46443b19')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(publicAddress='')
        with self.assertRaises(ValueError):
            User.objects.create_user(publicAddress='', password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(publicAddress='0xA92D81d1Af416C80610D9458B38cCc3a46443b19', password='foo')
        self.assertEqual(admin_user.publicAddress, '0xA92D81d1Af416C80610D9458B38cCc3a46443b19')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                publicAddress='0xA92D81d1Af416C80610D9458B38cCc3a46443b19', password='foo', is_superuser=False)
