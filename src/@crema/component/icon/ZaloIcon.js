import * as React from 'react';

export const ZaloIcon = ({ width = 36, height = 36, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 37 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    {...rest}>
    <circle cx={18.5} cy={18} r={18} fill='#0068FF' />
    <path fill='url(#a)' d='M3.65 3.15h29.7v29.7H3.65z' />
    <defs>
      <pattern
        id='a'
        patternContentUnits='objectBoundingBox'
        width={1}
        height={1}>
        <use xlinkHref='#b' transform='translate(-.38 -.38) scale(.00343)' />
      </pattern>
      <image
        id='b'
        width={512}
        height={512}
        xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAgAElEQVR4nO3df3yV9X338fc3OUBgGUaNGmmqsaYuU7wNLrNwi23q6MRJLZ2wYosbvaXyw/pQN536sNzirc66dgNvW2UVb9MWfw2dtOKkKxVWcaBmFUZ0eWgcaFMNNkqkGSTk5HzvP66kBkzIuc65rut7neu8no9HHsFwznV9OOac6319f0oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIl3FdAICPstamJFUP+VHFwFch6JTUPfDntDGm3WUxAIZHAABCZq2tllQ18HWMvAv70ZIqB35WNvCz1JD/TqKuga8eSR3yQkLnwJ/3Dnx/d+B7hzGmw1GdQFEgAAB5stZWSqqV9ImB75+UVCPvol7jsLRCl5a0W1K7pDZJuwa+/5ekVmNM9xGeC2AUBAAgS9baMkmTJZ0t6cyBP0+WdyeP6HVI2i6pVdLLkv5DUosxJu20KqBAEACAEVhrJ0s6R9I0SQ3yLvYpp0VhND2SWiRtk7RV0ovGmDa3JQHxRAAABgxc8M+X9FlJjSqcQXc4sg5JmyVtkvQsgQDwEABQtKy15ZJmSrpo4HuV24oQkd2SNkj6kaTNxpgex/UAThAAUFQGBuxdLOlSSdOV3BH3yE63vDDwpKQfM7AQxYQAgMQbGLz3p5IukzRD9ONjeD2S1kt6SNJ6BhMi6QgASCxr7VRJl0uaJ6nccTkoLJ2S1kh6wBjT4roYIAwEACTKwN3+n0u6St6ofSBf2yTdLWkd4wWQJAQAJIa1doGkFWL0PsLRIekeSd8zxnS6LgbIFwEAibC/z143PqVvua4DRaFH0ipJdxtjdrsuBshViesCgLwssbPXNtuXufgjQmWSrpH0urX2QWttreuCgFzQAoDCtMTOl9XNK+aq7przXReDIpeW1CRpGRsYoZAQAFBYltjZyugWGdWvmCtx8UeM9EhaKekuY0yX62KA0RAAUBiusNNVqjtlNV2Sbr9YuvlC10UBw+qUtEzSatYSQJwRABBvS22tMrpT0pzBH11zvrRirsOagOy0SFpijNniuhBgOAQAxNMCW6ZxullG12nIcr3zGqRHLndYF+DfGknXMnUQcUMAQPwssjNldJ+kmqE/nlEnPXOVlGLuCgpPp6TrjTFNrgsBBhEAEB9X2EqV6B55S/ceoq5KeulGqXycg7qA4KyX1y3Q7roQgHspxMMiO0cl+k8Nc/GvLJee+ToXfyTCLEk7rbVzRn0kEDJaAODWNbZCB3SPjOYP99epEumnV0uNp0VdGBC6NfJaA9iCGE7QAgB3ltip6tHLI138JW+0Pxd/JNR8SS9ba+tdF4LiRACAG4vtX8vqOR020G+oeQ3S1xsjrAmIXq2krQMbWQGRogsA0Vpqy9WvH8po9pEeVnuc9PLN9PujqKyW1yXA4kGIBC0AiM4Vtk4ZvTTaxb9sjLT2Ci7+KDoLJW2y1la5LgTFgQCAaCyyM1WilyTVjfbQb18i1VdHUBMQP9PldQmM+j4B8kUAQPgW2cUyekpS+WgPnXm6dOVnIqgJiK8aeSFguutCkGwEAIRrsb1zYFW/1GgPrZgg3X9ZBDUB8VchrzuA9QIQmlE/lIGcLLcpdeh+SVmPbl4xR6quCLEmoLCkJD1ira00xqxyXQyShwCA4HkX/0c0ZAe/0cw6U1owLcSagMKUknSftbbMGLPSdTFIFroAEKwcLv4VE6T7vhxiTUDhW2GtvcZ1EUgWWgAQnOU2pT3aJG8kc9Zuv5imfyALK6y1oiUAQaEFAMEYvPO3/i7+DSdLi84LqyggcVZYa7/uuggkAwEA+cuh2X/QPV/yNvwBkLUVzA5AEPjoRf726B7lcPFfeK409ZQQ6gGSbXB2ADtlIC8EAORnkf3fslrs92kVE6TbLg6jIKAopCQ9Za2d7LoQFC4CAHK32C6Q0a25PPW6GVLVxKALAopKuaRn2DsAuWI3QORmsW2U9FPlMJOkaqK063Zv0x8Aedsm6bPGmB7XhaCw0AIA/xbbGklrleM00m9+kYs/EKCpku5zXQQKDwEA/iy15bJ6UlJlLk+vPU76yjkB1wRgAdMD4RcBAP706z4Z1ef69NsuZtofEJIV1toG10WgcPBRjOx52/rOz/Xp9dXSPD6egLCkJK211rKuJrJCAEB2ltp6Ga3I5xA3XhBUMQBGUCPpftdFoDAQADC6pbZcGf1QUlmuh6g9Trrk7ABrAjCSOdbarLfhRvEiAGB0Gd0pKa8FR77xJ/T9AxG6x1pb47oIxBsfyTiyRXampLxGF1dNlL70BwHVAyAb5ZIedF0E4o0AgJFdYytk8u9PvOZ85v0DDjRaa30v043iQQDAyHp1p6TqfA5RNkZa9OmA6gHg150sFYyREAAwvCvs9Fw2+TncgqlSxfggCgKQgwopv9k7SC4CAD5quU2pJJipRFeyYSng2jxr7QzXRSB+CAD4qA79paS6fA/TeJo0eVIA9QDI1z3W2pz27kByEQBwqKW2StKyIA61+LwgjgIgAHWSrnBdBOKFAIBDeXP+y/M9TGW59IWzAqgHQFDuYJlgDEUAwIeW2npJgawgNv8cpv4BMVMh6WbXRSA+CAD4UCa40cKXnxvUkQAE6OtMC8QgAgA8i22jpEDG7NdXM/gPiKkySbe5LgLxQACAxwZ3979gWlBHAhCCBdbaWtdFwD0CAKQldraM6oM4VKqEXf+AmEuJsQAQAQCSlNEtQR2q8TSpmnHGQNzNZ7dAEACK3WI7K6i7f0ma1xDUkQCEKCXpatdFwC0CAP4qqAOlSpj7DxSQxdbaStdFwB0CQDFbZBsU0Mh/yWv+r8x7CSEAESkTqwMWNQJAMTO6IcjDzebuHyg0V1lry1wXATcIAMVqoa2WNDvIQ34hsJEEACJSpYA/B1A4CADFKqUr5Q0ECkR9NaP/gQLFYMAiRQAoRsttSgGt+T9o1plBHg1AhKZaaye7LgLRIwAUo3c0W17TX2AuOCPIowGI2OWuC0D0CADFqCTYN3vFBGnqKUEeEUDE5ltrA+sSRGEgABSbhbZaVjOCPOSMOm8NAAAFq1LSLNdFIFp8bBebUv2ZAhz8J3kBAEDB+4rrAhAtAkDxuSzoA37mtKCPCMCBWdZalvIqIgSAYrLU1ga57r8kVU2U6k4I8ogAHCmTdLHrIhAdAkAxsfqzoA/ZyN0/kCRfdF0AokMAKCYZzQ36kAQAIFFmsjRw8SAAFIuFtjro5n9J+hTT/4AkKVeAG4Qh3ggAxWKM/iToQ1ZM8JYABpAoX3BdAKJBACgWVp8P+pAs/gMk0kzXBSAaBIBisMCWKYRmvYaTgj4igBiosdbWui4C4SMAFIMyTZXXtxeohpODPiKAmDjfdQEIHwGgGFh9OozD/gEBAEiqz7ouAOEjABQDE/ybubJcqq4I+qgAYoKZAEWAAJB0Xv//1KAPywBAINGqGAeQfASApBurBnlLfAaqriroIwKImXNcF4BwEQCSzoTzJmYGAJB401wXgHARAJLvvDAO+nu0AABJF3jXIeKFAJB0Rg1hHJYdAIHEm2ytTbkuAuEhACTZFbZSUuCL9dZVSWVjgj4qgJgpkzTZdREIDwEgyUK6+689LoyjAoih/+G6AISHAJBsp4dxUAIAUDSmuC4A4SEAJFsob14CAFA06lwXgPAQAJItlP672uPDOCqAGKp3XQDCQwBIMhNOej/5mDCOCiCGqqy1gW8khnggACTVYlujEFYAlKSaY8M4KoCYohsgoZjjmVRWdTLBH7ZqYrymALbukfbsc11F8I4aL9UHPoGzsPT0SS/szv7xvGah+YSkZtdFIHgEgOT6RBgHrT46jKPm7q6fSE1bXVcRvMbTpE3Xuq7CrY59UuPfZ/94XrPQsClQQtEFkFQlCmW/PrYABooOe38mFAEgqaxqwjhs1cQwjgogxmgBSCgCQHKFEwCOCuOoOFycxlmg6DGyIqEIAMkVSgBgBkA0WGwJMRLKZwncIwAk0XKbklQZxqErxodxVBxu8iTXFQC/lbLWsgF4AhEAkqgjvCa7iglhHRlDXXSm6wqAQxAAEogAkEyhNdmxCmD4ZtQx2wKxQwBIIAJAElmFdplOlYZ1ZAy6+ULXFQAfwQ4gCUQASKKScPr/Je5Mwzb7LG9BGyBmaAFIIAJAEmV4sxaiqonSfV92XQUwrJitAYogsBRwEpXoRNngDxvHKYBfOCt+dbW9K6150d9zysZITy5moSXEFjcVCUQASKKMysPYCCiOZp/lfcVFd6807W/9P+/++dJUFlxFfIXWrQh36AJIIhPONEBWpxvdpQ9ILW/7e851n5PmnxNOPUBAyl0XgODRApBMZWEclObpI7v1aWn9Tn/PmVEn3Tk7nHqy0dPn7br35vuH/vxjFVJlOQs/jaa9S/r3N6W2X0u73/NagIYqS3ldVLXHS2dVF/QKj3QBJBABIJl4s0Zs/U5p+Xp/z6k+WnrkcikVYTtcy9vSz1qlza9J29u9i9aRVJZLDSd73RN/VOd9j7LeuElnpA2vSD/aIW1sHf31O1zFBGnm6dKsM73xK+XjwqkzBKHcVMAtAgCQp5a3vaZ/PwYH/VVG0LDasU/6h+ekNS94d6p+dHZ7F7wNr3gBp7JcmtcgXX6uVH9YR9P2dunatdkdt75aWjHXXy0udeyT7n5WWv2895rkqmu/9Giz91U+zuv6ufqPpLoTgqs1JEwATiACQDKxeUdEug5IX1z10abf0dx3qdRwUjg1DWr7tXTHM96FP50J5pid3dJ3NntfjadJt1z04boFHxzwWhaSpLPbew1XPed1lwSpu9c77qrnvCBwy6xYdxEQABKIAICsFXPT73DSGenS1f7vqr/eKC2YFk5NkndhuXW9tPLZ4C78w9n8mvc1+6zCupvPVtNW6drHvbv2sK15UXr8ZenGC7yVIHmvIQoEgKRZassV0od+NUuBHOLW9dKGV/09p/G0cC+Wm1+TvvoD/33T+Vg30B8+5+zozhmmzm7vNfQ7oDNfPX1eN8u67dLaK+LXGmCtrTbGtLuuA8EhZyZNhvm6UVjzonT7M/6eE/agvzuekT53d7QX/0Hdvd4dc6FreVv6w29Gf/Efanu7V4PfcBkBbhgThgAA+LS9XVrysL/nhLnSXzojXfag9I0fh9vkn3Rb3vAWcXIRoA7XtV/6/He9bgEgLAQAZC3d77oC9zq74zXoL53xZiD4XXoYh9ryhnThPf7/v4YpnZHmfs+bMRATLAaUMASApMmEswqg5C16UszSGWnu/f7vEBefF96gv8selB7/RTjHLhYtb8fv4j/UZQ+67ZIYgu7FhCEAJE0J/XRhuXat/2luU0+R7pkXTj3Lfhyru8OC1Nktff7e+F78pQ9befwuMQ2MhosFkIWmrd7cdz+qJnr9/mEM+tvwqv9BiCNJlXgDFKuP9v7cvtdr7Ql63nscBTVjomyMNHmSt6BPqtR7HdMZb4poy9v5TyXs7vVCwEs3sicHgkMAAEbR/Ja05BF/z0mVhDfor7PbaxbOx+RJ3op+f1TnLfU7XEgZXDb40WZp2678zhdHTVvza1ovH+e9hl9q8KZ3HinoNb8pPfGyd86Ofbmdr+VtadlT0rf+NLfnA4cjAABH0LHPG43t9274vi+Ht73vtWtzX4526inSbRd7mxCNZvIk7+vq872ZD8t+HJu+6Lx1HfAW+clFqsTbwfGGC7LfLKnhZO/rlouk7/6r13qTS6vAyp9JfzHV+/8C5IsxAMhaHKZHRSmd8Ub8+71jW3iu9xWG5jdzG/FfPk76zjxp619nd/E/XH219NRS7ysJu0Leuj63C3B9tfTyzd4OjrnslFg2RvqrGdLOZd6mQH6lM9nvtwCMhgAAjGDJw/6bvqee4t39h+X6f/L/nKqJ3oX/ys/kf/5ZZ3oXwIaT8z+WKx37vPX3/Zp9lvTcdcHcfVdXSE9dKV1zvv/nbmxN3p4LcIMAgKwVw6CwQauf9778CHPQn+Q1w/v94K851rtgB9lkXDVR2nStNP3U4I4Zpbuf9f+7POdsb3neILfvTZV4y0LnEgLufja4OlC8CADIWq6DlwrN5tf8r/QX5qC/QX4/9MvHSc9cFU5N5eO8f2/c1qsfTTrjf8ni+mrpwT8PL9itmOt/H4X1O1mXA/kjAMCXpC81297lTbfy++9cMTe8QX+Sd8fqd8Gf++eHu898Zbl3V1xIO9dtfs1fkC0bIz2yMNg7/+HcP9/fZlvpjPQEC0AhTwX01kUctO91XUF4evpyG/S3YJq3xW+YNrzqb7GaWWd6U9TCVl/tjYgvFI/5XDjpxgvCDVGDKsb73yWSFSCRLwIAfEnyOICvrfFG2fvRcLK3zn/YfuJzZ7jbLg6njuHccIFUMSG68+VjY2v2j62Y4E2BjMqcKV6gyta2XfFewRDxRwCAL3t+47qCcPzdRv/T6wYH/UWxMtuWtuwfO/MMfxeSfFWMD2/aY5Dau/xNZV14bm5T/fLhZ0BgOpPMBZoQHQIAfOn4wHUFwdvYKt34pL/npEqkRy73pnOFrbvX3zrw888Jr5aRfMXBOf3a8Ut/j3fxb7rkbH+Bckd7eLUg+QgA8KXrgOsKgrX7vdwH/TWeFk5Nh2vd4+/xF50ZTh1HUl/tTTmMMz+vY9XEaFtRBpWP8zeYtLUjvFqQfAQA+JKkqYDdvd5OcH6X1Y1i0N9Qb/potp48Kfpm60FxXxzIzwBWl/8WP+cuttU5ESwCAHxJ0gfOV3/gf4vVqAb9DeVnoJfLeflRjJbPh5/Wq0J5HRkEiHwQAOBLUloA7njG/zSqyvLoBv0N5Sd0uRyNn4Q9Aga5fB39nDsp70e4QQCAL0lYB2D9Tmn5en/PiXLQX6EqL3NdQTKEvegQMIgAAF8KffnR1j25Dfr75hdz20UvCK769P1K0gyRdL+7c/u5q68sD68OJB8BAL507S/cmQDdvd5Kf377Teef423h6oqfJmGXLTRxb472c2fd9uvw6hiNnyBFawHyQQCAb4U6EPDSB/xPm6qvDnd732z46Vvf7nBeuMtzZ8NP943fwaFBan4r+8fGfeol4o0AAN/8TEuLi2U/9vr+/Rgc9Of6LuvkY7J/bGe3m4tXT1/8V6Wrq8r+sS1vu2vR8LPqY9xnXiDeCADwzWXzaC4e/4V0+zP+njM46C8Od1h1Vf5CyBMvh1fLSDa8Gv99Is6Y5O/xP9oRTh1HsuUNf8HDT6gBDkcAgG9t77quIHstb3vz/f1yOehvOH4Wh1n9fPTbNj/wfLTny0Xtcf66U1b9PLxaRvLdzf4e/5mIVqNEMhEA4JvfpWld6TpQmIP+huMnjLTvlR7yubFRPra3++9eccXP67i9XVoXYStA26/9rU3RcHLhzBBBPBEA4FshrD+ezkhzv+e/u2LyJPeD/objd33/G5+MbrbGVY9Gc54gzDzD3+NvWhdd18ZVj/lruZnlYM8HJAsBAL517Iv/VMCb1vnb+13yptvFYdDfcOqr/fX3duyTljwcXj2D7n7W67cuFJdM8ff/t7XD+10K26rnpA2v+HtOIezAiHgjACAncW4FWPOi9O2f+nvO4KA/l2vAj2bhuf4e/2izdNdPwqlF8gLWdU+Ed/wwlI3xNnPyY+WzUtPWcOqRvADltxVlRl28f1dRGAgAyElc9yFvfiu3O9/ls6SZpwdfT5AuP9f/GvU3rvMuYEHb/Jo3viLqwYZBuPp8L/D58bU1XqAK2pY3pAvv8f86XhnhbpRILgIAcuJyoZSRdOzLbdDfnLOlmy8Mp6YgVYyXrjnf//OuXeu/f/lIVj0nfe7uwt2JrvY4af6n/D0nnfEWkrr16eBex6atub2O9dXS7LOCqQHFjQCAnMRt1bfBD2i/S+FOniQ9+Ofh1BSGq8/Pbde972yW/vDO/Bbr2f2e9Pl7vRaWQrzzH+qWi3Lb1XH5eum8b+f3+7/7PWnu/d701FwGGK6Ym/u5gaEIAMjJ9l+6ruBQ1671mqX9iPOgv5FUjJe+dUluz93eLk37W6+VZMOr/p635GHp928tnOl+o6k5VvpGjq0+23ZJU+7wXkc/v3NDX0e/W1EPmn+O1MjcfwQk5boABMwoJRv+abp7vW6AyT5XVwvD6ue9O1y/ao6R7vC5QmBUKsulb/3p8H83/xzpsebcL8brdnhfVRO9aXGDMwwG74jT/d70ye3t0sb/LLyVH7N1wwXea5hrq8jg61h9tDcor+Ekqfb48F7H6qOle+bldwxgKAIAcraj3X0AyHXQn+R9MMetK2NQzbEjBwDJ67aY8jf57f7XsS/c0e1xNzjzY8rfeLtc5qp9r/c6hvlaDtbKwj8IEl0ASWOVjupUzW9GdabhpTPJ6I/ORVw2Kip0NcdKa7/mf1ZA1O6ZJ00/1XUVSJqY/9ojzlwvALNuh/sQ4lLDSdLaK+J/8Yq7GXXSIwvj+zp+40Jp8Xmuq0ASxfRXHoVg+y/d7gD3WAjzsgvNzNO9ixctAfmZMyWeIeAbF0q3Xey6CiRVzH7dUUjSGa8P3hW/S/0m1Zwp0jNXed0CyN2cKdJTV8YjTKVKvD0puPgjTAQA5OX5Njfn7ezOb+BW0kw/VXrpRn/bBgctDhfOfM08XXr5Zm9mhCvVR0ub/pJmf4SPAIC8bH7dzXkLdRW6bOVyMa05Vtr6196yxrkscpOPhed6gxKD5CpQ1B7nvY43XhB9l8CCadLOZQz4QzQIAMjLlrbiHIUfNr/b1g5KlXir3O1cFs1ysdNP9S6W98/3/pzLKoUjqSx3161RNka6c7bXGhDFtrv11dKma73pnUz1Q1QIAElj1BPl6bp7i3skfhiqJko3/HF+x6g9zrsjf/lmaV5D8HeyM8/wxh08d5009RTvZ2Vjcl+lcCS57H0QpMmTpKeWeiFnztnBv44z6j78/1QAK/x1ui4AwWIhoKSxinyj3p+1fngRQH4aTpZ++NXg7nzrq70FZFbM9WZNrNuRe6tNw8leq8JXzvG6G4Yz/xxvZsj1/xTMGI0bLvDWzl/9fP7HysfUU7z1Ajr2Bfc6fqmh4Lb07XZdAIJlXBeAgC22NZLy2PLFv8bTvObLKHX3Sk+8HO05w/Z7J0QTpLp7veVvd7RLbe9Ku9/3fja4qmDVRO9uvuZYqe4E7y743Fp/TdPdvV4w7Dow/N+fMNHf9sute6QXRvmt9nvMfA33Ovb0eYFFCuZ1jJlTjDG7XReB4BAAksZBAEiVSHv/PhmjwAGM6OPGmJguno1cMAYgaUqi76dLZ/zvxAegsHDxTx4CQNLca5z00/1oh4uzAgByRQBAIPzsLw+g4HS5LgDBIwAkU+QDddr3Mh0QSDACQAIRABAYugGAxIp0fRFEgwCQREZOBuusIwAASRX5+iIIHwEgiazSLk7b8rbU9msXZwYQMhYBSiACQDI5W6zjsWZXZwYQIpYBTiACQBJFvB/AUGtedHVmACEiACQQASCJMnrH1albO6TtLBcCJM1e1wUgeASAJCpxO2DnIVoBgKQh1icQASCJMm6b6x5tzm2XNACx9a7rAhA8AkASWbdv1va90sZWlxUACBhjABKIAJBEJe6b6x5wvH87gEA5/0xB8AgASVTl/s26fqfUycxhIAnSxhgWAkogAkASLTdpOV65q6dP+v42lxUACIjzGwqEgwCQXM7ftKt+7roCAAFwtrAYwkUASC7nb9q2X7NNMJAAzj9LEA4CQFKZeLxpv7vZdQUA8vS66wIQDgJAcsXiTbt+p9S6x3UVAPIQi5sJBI8AkFz/5bqAQXf/zHUFAPLwmusCEA4CQFL1KTZL8TRtkzr2ua4CQI7aXBeAcBAAkmq1aVdM9vDu6WMsAFCgOowxXa6LQDgIAMkWm1aA7/yr1HXAdRUAfIrNZwiCRwBIthbXBQzq2i/d/azrKgD4tN11AQgPASDZXnZdwFArn6UVACgwO10XgPAQAJLMKFbL8NAKABSc/3BdAMJDAEiycWp2XcLhaAUACkZaMepGRPAIAEm20nQpZlN4uvZLd/3EdRUAstBijOlxXQTCQwBIvtgN4ln5rNTOxCIg7tjPM+EIAMn3nOsCDtfTJy37sesqAIxiq+sCEC4CQNIZvei6hOE0bZWa33RdBYAjiOVnB4JDAEi6E9QsKZb9eFc95roCACPoNMawCFDCEQCSbrlJK6Z9edt2SWu4xwDiaIvrAhA+AkAxsNrkuoSRXP8E0wKBGPqp6wIQPgJAMbCK7fI7Hfukm9a5rgLAYWL7mYHgEACKwSRtU0x2BhzOqp9LW95wXQWAAe30/xcHAkAx8MYBbHBdxpF8bY03PRCAc7H+rEBwCADF4xnXBRxJa4e07CnXVQCQ9LTrAhANAkCxKNE/uy5hNCt/5s0MAOBMj6SNrotANAgAxeJe0yET76k96Yx06QNSd6/rSoCitcEYE9vxQggWAaC4xLobQJJ2v8cCQYBDdMQVEQJAMTH6R9clZKNpq/Ro7DYyBhKvRxK7dBQRAkAxude0KaarAh5uySPsGAhEbIMxptN1EYgOAaD4POK6gGx07WfHQCBidOKYhhEAAA2ZSURBVL4VGQJAscnoYUlp12VkY80LtAIAEemSxJqcRYYAUGy+Zzpltd51GdlIZ6TvsyM5EIVHjTGx3DUU4SEAFCOjB1yXkK31O11XABSFgvlMQHAIAMWoShsktbsuIxvNb7JEMBCyZmMM826KEAGgGC03aRnd57qMbKQzUuse11UAiVYQnwUIHgGgWBn9P3nzfmPvV3tdVwAkVqekh10XATcIAMXqXtMh6VHXZWSj879dVwAk1moG/xUvAkAxK9HdrksA4EyPxGdAMSMAFLN7zXaZ+O/9XT7OdQVAIj1qjOlwXQTcIQAUO6u7XJcwmhMmuq4ASJy0pDtcFwG3CADFbpXZLGmz6zKOpOZY1xUAibPGGNPmugi4RQCAJN3quoCRVEyQqitcVwEkCnf/kEQAgBTrVoD6atcVAInD3T8kEQDwoVi2AjSe5roCIFG4+8dvEQDgWWU2y8ZvN7DPfNJ1BUCirOLuH4MIAPiQ0TLFaKvgynJpeq3rKoDE6BJ3/xiCAIAPrTItkppclzFo9llSit9QICh3Mu8fQ/HxikNldJOsulyXIUl/Mc11BUBitEn6v66LQLwQAHCo75lOGd3iuozJk6Tpp7quAkiMq1jzH4cjAOCjqnSvpBaXJXy90eXZgURZZ4yJ/ZLfiJ5xXQBiaomdKqutLk5dNVHadbtUNsbF2YFE6Zb0+8aYdteFIH5oAcDw7jPbJH3HxalvvICLPxCQm7j4YyQEAIysRDdJ2h3lKWuOlRadF+UZgcR63BjjJMSjMBAAMLJ7Tbekr0Z5yjtnc/cP5KPjg4zefL//a8aYua5rQbwRAHBk3gqBK6M41Yw6aV5DFGcCkiedke7+l/9Wwy2dq2qOTa12XQ/iL+W6ABSAXt2kcWqUUX1YpygfJ90/P6yjA8m28dWDuvbhfWpp72vV/tT1rutBYaAFAKNrMj0yukzeiOJQfPOLXv9/nGx/q08tv4rNysjAR7S+k9bnV+7V5/72PbW09/XIZC7V2uNDe58iWZgGiOwttgskPRj0YWefJT25OOij5m7jq7367sb9WveLHqVKjeZPG6/bLilX9dGlrksDJHn9/Det/Y3WbD2gdL/1fmi0RE2TVrmtDIWEAAB/FtsHJS0I6nC1x0kv3SRVjA/qiLnp2m/10Nb9WrVpv1raP3rXXzbGaPFnJ+iGi8pVdRQNZ3Cj44OM7nq6W6s27VdPnx36V2v0/UmXuaoLhYkAAH8W2DKV6TlJeQ/XKx/nXfzrTgigrhykM9LGV3r10NYDevylnsM/UIdFEIALR7jwS1KL9qem0fQPvwgA8G+hrVZKL0mqyvUQqRJp019Gv95/OiNtbj2ox144oHW/6FHnbzI5HadsjNH8/zleN1xUrtrj6RpAONre7dffPdOtpi0HRgqonervn6Y1H2+LujYUPgIAcuMtFbxJUpnfp6ZKpEcWSnOmhFDXMNr39utnrxzUhp29Wr+jR909o9/pZytVajTrrHH6qwt/R9M/OTaw46K4bXujT3c93a31O3o/7OP/qLSM+ZyaTtwcZW1IDgIAcrfIzpHRWr9PW/XlcFf7a3u3X8+/dlDb3jioza0H1fpONCP5G04Zo2v++Hd0SUOZysbw1oI/PX1WTzT3aOW//Lead/WN/gRjvqqmE5vCrwxJxacU8rPEXiOrFVk/vr9XW28o0dRT81/ur7vXqvWdtF5pT6vlV33a/lZazbv61LU/t2b9oFT+bokWfnqCFn12gmoq6R7Ake3u7Nc/bNqvpi371fFBtr+75hZ9/8T/E2phSDwCAPK3yK6Q0TXZPrxM+zTz9/tVU1mqyt8t+e30uupjSpUaMq6u44N+9fR5d0YdH2TU2Z1Rxwf9an8/o7Z30zn330dpxhnjtPDTE/SFs8fRKoDf6umz+tEvetW0Zb827Oz1+/RV+v6kJWHUheLCJxKCsdjeL2lh1o8/uFfq7wmvnpipmFCieZ8q01f+53jGChSxLa8f1EP/dkCPvtCTa0vV43rzxEu12bBCFfJGAEAwltuUOvSIpDlZP6fIQsCg6mNKtWD6eF3SUKb6k9j5KOm2v9WnJ5p7tObfDmh3Z38+h+Lij0ARABAcQoBvtSekNO9TZbrorLJAxkUgHra90aend/To0Rd61LYnkOs1F38EjgCAYBECclZ9TKlmnjlOXzi7TDNOH8uYgQLS02e18dWDenp7j9bv6FX7+3nd6R+Oiz9CwScMgrfcprRH98gq+xX+e9+TMgdDLKqwlI0xaqwbqxlnjNMFZ47T5I+xcWfctL6T1k929mrDzl5tbj2Y1UqSOeDij9AQABCeJfZbsrouuwdbqfd9QsAIqo4qVWPdWDXWjdVn6saq7kQCQdRa30nr+dcPauMr3voSHR8Eepc/nNV688QlXPwRFgIAwuWtE/AtSVlcsQgB2ao6qlTTTxuj6Z8cq0+dOlb1J6XoMghQT5/V9rfSeuGNg9ry+kFtea0vigv+ULfr+5OWRXlCFB8+MRC+JXa2rH4oqXz0BxMCclE2xmhydUpTB8LAH9SM1eTq1CHrKmB46YzU0p7Wv+8+qO1vpbXtjYNqaU+H1aQ/ajmydol+8LHVLk6O4kIAQDQW2QYZPaWsNhCyA2MCslgOFSNKlRpN/lhKdSemVH+S9/33TkwVdfdB6ztpvfFuv1rf8VaNbH0nrZZfpY+03n6UumTtXP3gYxtdF4LiQABAdJbaKmX0pKSpoz7WZqSD70kZuj+DVjbGqPaEUtUen1LtCaWqqUyp9vhSnVxZqprK0oLuSujps9rd2a83O/vV9m6/dnem1banX23vet8d3dVno0X9/V9kVz9EqXDf6ShMfmYIEAKcGFyeueqoElUdVfrbJZsrJhhVH12qoyZ4f6783RKVjwv/I6S716rzNxl17bf6YH9G7Xv71bXf+9nuzn51fNCvjg+8nxfC8tDDeFz7U1/V2uO7XReC4kIAgBuL7TxJ92u0cQGEgNirGAgEkgZCwYcDD8rLjCrLRx6I0NmdOWR7Zm/fB2+wXdd+63xjp5ClZXS9miatdF0IihMBAO4stbXq11oZ1R/xcTbjjQmwhAAkhWlTxl6qH05qdl0JihdjhOHOvaZNJ+oPJX1T0shXd1MijTva+w4UvtXaXzqFiz9cowUA8bDETpXVg5LqRnyMTQ+0BCS6WRjJ1S5bskQ/qFrvuhBAogUAcXGf2aYeTZHRtzVSa4BJSeOOpSUABcg2yfSeycUfcUILAOLHWzPgPkkNw/49LQEoHK0yZomaTtzsuhDgcNxKIX7+wTSrStNktURWXR/5e5OSxh4jGfIrYqtbVjfL9E7h4o+44hMU8XaFrVSpbpPVQh2+n0DmoHTwfcnGdnEXFCXbpLRdpoeq211XAhwJAQCF4QpbJ6M7ZTT7kJ8TAhAfm2Uy16qpervrQoBsEABQWBbbRkm3SGr87c8IAXCrWcZcT1M/Cg0BAIXp8CCQ6ZV690oiBCAy22V0q5omrXNdCJALAgAK22LbKKMbZDVT/T3SwS4RAhCyzTK6S02TNrguBMgHAQDJsNTWK6Or1X9gng5+UEYIQMDSkn1cGfN3rOCHpCAAIFmW2ir17P1f6u9ZIqnadTkoeB2yalJ/5ruM6kfSEACQTI02pZP2zJTJXC5plg6fQgiMLC1po6x5QG9VrdNmwy5USCQCAJLv0rcrNVZfljRX0nTX5SC2tsvqh+rP/CN3+ygGBAAUl/m/rFWqdI6sLhJhAN5Ff60y/f+oNR9vc10MECUCAIrXgl1V0tg/kTUXSpopqdx1SQhdt2Q3S+YppTP/zJ0+ihkBAJC8MQMff2eqSsz5kv2spKmSylyXhbz1SNommU0y+rnUs01Np/S4LgqIAwIAMJxGm1LNngbZzDmSzpNMvWRrXZeFUbVLapbVc7J6UaW9zVzwgeERAIBsLdhVoczYBhlzumSnSGaypDrRdeBCt6RWSa/KaodK9Kp61axHJnW6LgwoFAQAIF8LdlUpM3ayjPmEZE+VzCckWy2ZGklVrssrYB3y7uh3S3a3ZF6X0Vvqy7TQdw/kjwAAhKnRplTTUa1+W61SHS+rSslUyWROkNWEgZCQ0oeLFlUruWsW7B743i5vrv1bkvZL5h3JdsioUzLvS9qt3VXtzL8HwkUAAOJowa4yqWxI64GpkmwBDErs75FKOz78754O+uABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJNX/B3T4tIUOQC3wAAAAAElFTkSuQmCC'
      />
    </defs>
  </svg>
);
