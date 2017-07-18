# EdgeRouter-Recovery

Often when replacing the USB flash in an ERLITE-3, the flash will "not work" because of insufficient time on boot. The following commands at U-Boot will extend this time and allow any USB storage device to work:
```
setenv oldbootcmd 'fatload usb 0 $loadaddr vmlinux.64;bootoctlinux $loadaddr coremask=0x3 root=/dev/sda2 rootdelay=15 rw rootsqimg=squashfs.img rootsqwdir=w mtdparts=phys_mapped_flash:512k(boot0),512k(boot1),64k@3072k(eeprom)'
setenv bootcmd 'sleep 1; usb reset; sleep 1; $(oldbootcmd)'
setenv bootdelay 0
saveenv
```
